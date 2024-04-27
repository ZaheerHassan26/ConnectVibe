export const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export interface NavigationType {
  navigation: {
    navigate: (screen: string) => void;
    goBack: () => void;
  };
}

export interface CamerProps {
  pictureModalVisible: boolean;
  setPictureModalVisible: (value: boolean) => void;
  setProfileImage: (value: any) => void;
}
