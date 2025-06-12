import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  THEME: '@imobiliaria:theme',
  USER_PREFERENCES: '@imobiliaria:userPreferences',
  FORM_DRAFT: '@imobiliaria:formDraft',
};

export const saveTheme = async (theme) => {
  try {
    await AsyncStorage.setItem(KEYS.THEME, theme);
    return true;
  } catch (error) {
    console.error('Erro ao salvar tema:', error);
    return false;
  }
};

export const getTheme = async () => {
  try {
    return await AsyncStorage.getItem(KEYS.THEME) || 'light';
  } catch (error) {
    console.error('Erro ao recuperar tema:', error);
    return 'light';
  }
};

export const saveUserPreferences = async (preferences) => {
  try {
    await AsyncStorage.setItem(KEYS.USER_PREFERENCES, JSON.stringify(preferences));
    return true;
  } catch (error) {
    console.error('Erro ao salvar preferências:', error);
    return false;
  }
};

export const getUserPreferences = async () => {
  try {
    const preferences = await AsyncStorage.getItem(KEYS.USER_PREFERENCES);
    return preferences ? JSON.parse(preferences) : {};
  } catch (error) {
    console.error('Erro ao recuperar preferências:', error);
    return {};
  }
};

export const saveFormDraft = async (formType, formData) => {
  try {
    const drafts = await getFormDrafts();
    drafts[formType] = formData;
    await AsyncStorage.setItem(KEYS.FORM_DRAFT, JSON.stringify(drafts));
    return true;
  } catch (error) {
    console.error('Erro ao salvar rascunho:', error);
    return false;
  }
};

export const getFormDrafts = async () => {
  try {
    const drafts = await AsyncStorage.getItem(KEYS.FORM_DRAFT);
    return drafts ? JSON.parse(drafts) : {};
  } catch (error) {
    console.error('Erro ao recuperar rascunhos:', error);
    return {};
  }
};

export const clearFormDraft = async (formType) => {
  try {
    const drafts = await getFormDrafts();
    delete drafts[formType];
    await AsyncStorage.setItem(KEYS.FORM_DRAFT, JSON.stringify(drafts));
    return true;
  } catch (error) {
    console.error('Erro ao limpar rascunho:', error);
    return false;
  }
}; 