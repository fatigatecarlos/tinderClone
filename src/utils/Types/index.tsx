import {TextInputProps} from 'react-native';

export type RootStack = {
  HomeScreen: undefined;
  RegisterScreen: undefined;
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

export type Button = {
  title: string;
  onPress: () => void;
};

export type User = {
  user_id: string;
  name: string;
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
