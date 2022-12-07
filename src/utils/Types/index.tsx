import {TextInputProps} from 'react-native';

export type RootStack = {
  HomeScreen: undefined;
  RegisterScreen: undefined;
  LoginScreen: undefined;
  ConfigurationScreen: undefined;
  ProfileImagesScreen: undefined;
};

export type Input = {
  label: string;
  iconName: string;
  autoCapitalize: 'none' | 'sentences' | 'words' | 'characters' | undefined;
  error: string;
  password?: boolean;
  onFocus: () => void;
  props: TextInputProps;
};

export type OptionSlider = {
  title: string;
  inicialValues: Array<number>;
  label: string;
  multiSliderValuesChange: (value: Array<number>) => void;
};

type SelectItem = {
  label: string;
  value: string;
};

export type Select = {
  title: string;
  inicialValue: string;
  items: Array<SelectItem>;
  setSelectedValue: (values: string) => {};
};

export type Button = {
  title: string;
  onPress: () => void;
};

export type AgeRangeType = {
  min: number;
  max: number;
};

export type User = {
  userId: string;
  name: string;
  description: string;
  profileImage: string;
  ageRange: AgeRangeType;
  maxDistance: number;
  selectedGender: string;
};

export type UserState = {
  user: User;
  users: Array<User>;
  token: string;
  loading: boolean;
  error: boolean;
};

export type Position = {
  lat: number;
  long: number;
};

export type PositionState = {
  position: Position;
  loading: boolean;
  error: boolean;
};

type ResponseKind = 'success' | 'failure';

export type RequestParam = {
  email: string;
  name?: string;
  password: string;
};

export type NetworkResponse<T> = {
  kind: ResponseKind;
  body?: T;
};

export type ThumbSlider = {
  name: string;
};
