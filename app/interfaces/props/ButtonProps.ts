export default interface ButtonProps {
  type?: "button" | "submit" | "reset" | undefined;
  isFullWidth?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  secondary?: boolean;
  isSignUp?: boolean;
  disabled?: boolean;
}
