import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Spinner,
} from '@chakra-ui/react';
import { colors } from '@theme';

export const ErrorComponent = () => {
  return (
    <Alert status={'error'}>
      <AlertIcon />
      <AlertTitle>Oups!</AlertTitle>
      <AlertDescription>
        We have trouble loading this component. Please try again
      </AlertDescription>
    </Alert>
  );
};

export const WarningComponent = ({ message }) => {
  return (
    <Alert status={'warning'}>
      <AlertIcon />
      {message || 'This component might load incorrectly'}
    </Alert>
  );
};

export const LoadingComponent = () => {
  return <Spinner color={colors.primary} />;
};
