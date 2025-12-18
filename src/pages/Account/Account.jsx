import { useEffect, useMemo, useState } from 'react';
import {
  getCurrentUser,
  logoutUser,
  updateUser,
  USER_CHANGE_EVENT,
} from 'service/userService';
import {
  AccountPageWrapper,
  AdaptationGroup,
  Button,
  Card,
  Checkbox,
  CheckboxLabel,
  Divider,
  Field,
  GroupTitle,
  Input,
  Message,
  OptionDescription,
  OptionTitle,
  Radio,
  RadioLabel,
  Title,
} from './Account.styled';

const ADAPTATION_STORAGE_KEY = 'app:adaptation-settings';

const getDefaultAdaptationState = () => ({
  visual: {
    fontScale: 'normal',
    highContrast: false,
  },
  motor: [],
  cognitive: [],
});

const readStoredAdaptationSettings = () => {
  try {
    const storedValue = localStorage.getItem(ADAPTATION_STORAGE_KEY);
    return storedValue ? JSON.parse(storedValue) : null;
  } catch (error) {
    console.error('Не вдалося завантажити налаштування адаптації', error);
    return null;
  }
};

const persistAdaptationSettings = settings => {
  try {
    localStorage.setItem(ADAPTATION_STORAGE_KEY, JSON.stringify(settings));
  } catch (error) {
    console.error('Не вдалося зберегти налаштування адаптації', error);
  }
};

const getInitialAdaptationState = () => {
  const stored = readStoredAdaptationSettings();
  const defaults = getDefaultAdaptationState();

  if (!stored) {
    return defaults;
  }

  return {
    visual: {
      fontScale: stored.visual?.fontScale || defaults.visual.fontScale,
      highContrast: Boolean(stored.visual?.highContrast),
    },
    motor: Array.isArray(stored.motor) ? stored.motor : defaults.motor,
    cognitive: Array.isArray(stored.cognitive) ? stored.cognitive : defaults.cognitive,
  };
};

const adaptationOptions = {
  motor: [
    { id: 'keyboard-navigation', label: 'Навігація з клавіатури' },
    { id: 'large-controls', label: 'Збільшені елементи керування' },
    { id: 'reduced-movement', label: 'Мінімум жестів та рухів' },
  ],
  cognitive: [
    { id: 'focus-mode', label: 'Режим фокусування' },
    { id: 'simplified-layout', label: 'Спрощені підказки та інтерфейс' },
    { id: 'reading-aids', label: 'Покращення читабельності тексту' },
  ],
};

const Account = () => {
  const [user, setUser] = useState(() => getCurrentUser());
  const [status, setStatus] = useState('');
  const [adaptationSettings, setAdaptationSettings] = useState(
    getInitialAdaptationState
  );

  const [updateForm, setUpdateForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: '',
  });

  useEffect(() => {
    setUpdateForm(prev => ({
      ...prev,
      name: user?.name || '',
      email: user?.email || '',
    }));
  }, [user]);

  useEffect(() => {
    const handleUserChange = event => setUser(event.detail || null);

    window.addEventListener(USER_CHANGE_EVENT, handleUserChange);

    return () => window.removeEventListener(USER_CHANGE_EVENT, handleUserChange);
  }, []);

  useEffect(() => {
    persistAdaptationSettings(adaptationSettings);
  }, [adaptationSettings]);

  useEffect(() => {
    const { fontScale } = adaptationSettings.visual;
    const scaleMultiplier =
      fontScale === 'increased' ? 1.25 : fontScale === 'large' ? 1.5 : 1;

    document.documentElement.style.setProperty('--font-scale', scaleMultiplier);
  }, [adaptationSettings.visual.fontScale]);

  const resetStatus = () => setStatus('');

  const handleUpdateChange = ({ target: { name, value } }) => {
    resetStatus();
    setUpdateForm(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async event => {
    event.preventDefault();
    try {
      const updates = { ...updateForm };
      if (!updates.password) {
        delete updates.password;
      }
      const updatedUser = await updateUser(updates);
      setUser(updatedUser);
      setStatus('Дані профілю оновлено.');
    } catch (error) {
      setStatus(error.message);
    }
  };

  const handleLogout = async () => {
    await logoutUser();
    setUser(null);
    setStatus('Ви вийшли з облікового запису.');
  };

  const handleToggleVisual = settingName => {
    setAdaptationSettings(prev => ({
      ...prev,
      visual: {
        ...prev.visual,
        [settingName]: !prev.visual[settingName],
      },
    }));
  };

  const handleFontScaleChange = fontScale => {
    setAdaptationSettings(prev => ({
      ...prev,
      visual: { ...prev.visual, fontScale },
    }));
  };

  const handleToggleAdaptation = (group, optionId) => {
    setAdaptationSettings(prev => {
      const selected = prev[group];
      const updatedGroup = selected.includes(optionId)
        ? selected.filter(id => id !== optionId)
        : [...selected, optionId];

      return { ...prev, [group]: updatedGroup };
    });
  };

  const handleResetAdaptations = () => {
    setAdaptationSettings(getDefaultAdaptationState());
  };

  const lastUpdated = useMemo(
    () => (user?.updatedAt ? new Date(user.updatedAt).toLocaleString() : null),
    [user]
  );

  return (
    <div>
      <h1>Керування обліковим записом</h1>
      <AccountPageWrapper>
        <Card>
          <Title>Оновлення профілю</Title>
          <form onSubmit={handleUpdate}>
            <Field>
              Імʼя
              <Input
                type="text"
                name="name"
                value={updateForm.name}
                onChange={handleUpdateChange}
                disabled={!user}
              />
            </Field>
            <Field>
              Email
              <Input
                type="email"
                name="email"
                value={updateForm.email}
                onChange={handleUpdateChange}
                disabled={!user}
              />
            </Field>
            <Field>
              Новий пароль (необовʼязково)
              <Input
                type="password"
                name="password"
                value={updateForm.password}
                onChange={handleUpdateChange}
                disabled={!user}
              />
            </Field>
            <Button type="submit" disabled={!user}>
              Оновити дані
            </Button>
          </form>
          <Divider />
          <Button type="button" onClick={handleLogout} disabled={!user}>
            Вийти
          </Button>
          {user && (
            <Message>
              Зараз ви увійшли як <strong>{user.email}</strong>
              {lastUpdated ? ` (оновлено ${lastUpdated})` : null}
            </Message>
          )}
        </Card>

        <Card>
          <Title>Параметри адаптації</Title>
          <AdaptationGroup>
            <GroupTitle>Візуальні налаштування</GroupTitle>
            <OptionTitle>Масштабування шрифту</OptionTitle>
            <OptionDescription>
              Збільшення шрифту здійснюється через вибір одного з трьох варіантів
              масштабу. Після зміни інтерфейс автоматично перераховує стилі з
              урахуванням нового масштабу.
            </OptionDescription>
            <RadioLabel>
              <Radio
                name="font-scale"
                checked={adaptationSettings.visual.fontScale === 'normal'}
                onChange={() => handleFontScaleChange('normal')}
              />
              Звичайний
            </RadioLabel>
            <RadioLabel>
              <Radio
                name="font-scale"
                checked={adaptationSettings.visual.fontScale === 'increased'}
                onChange={() => handleFontScaleChange('increased')}
              />
              Збільшений
            </RadioLabel>
            <RadioLabel>
              <Radio
                name="font-scale"
                checked={adaptationSettings.visual.fontScale === 'large'}
                onChange={() => handleFontScaleChange('large')}
              />
              Великий
            </RadioLabel>

            <OptionTitle>Контрастність теми</OptionTitle>
            <OptionDescription>
              Підвищення контрастності активує висококонтрастну тему, у якій
              кольорові елементи замінюються чорнобілими, а текст стає максимально
              читабельним.
            </OptionDescription>
            <CheckboxLabel>
              <Checkbox
                checked={adaptationSettings.visual.highContrast}
                onChange={() => handleToggleVisual('highContrast')}
              />
              Висококонтрастна тема
            </CheckboxLabel>
          </AdaptationGroup>

          <AdaptationGroup>
            <GroupTitle>Налаштування моторної доступності</GroupTitle>
            {adaptationOptions.motor.map(option => (
              <CheckboxLabel key={option.id}>
                <Checkbox
                  checked={adaptationSettings.motor.includes(option.id)}
                  onChange={() => handleToggleAdaptation('motor', option.id)}
                />
                {option.label}
              </CheckboxLabel>
            ))}
          </AdaptationGroup>

          <AdaptationGroup>
            <GroupTitle>Когнітивна адаптація</GroupTitle>
            {adaptationOptions.cognitive.map(option => (
              <CheckboxLabel key={option.id}>
                <Checkbox
                  checked={adaptationSettings.cognitive.includes(option.id)}
                  onChange={() => handleToggleAdaptation('cognitive', option.id)}
                />
                {option.label}
              </CheckboxLabel>
            ))}
          </AdaptationGroup>

          <Button type="button" onClick={handleResetAdaptations}>
            Скинути налаштування адаптації
          </Button>
        </Card>
      </AccountPageWrapper>

      {status && <Message>{status}</Message>}
    </div>
  );
};

export default Account;
