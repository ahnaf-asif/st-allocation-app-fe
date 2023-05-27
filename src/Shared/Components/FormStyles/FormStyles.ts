import styled from 'styled-components';
import { TextInput, Textarea, Select, PasswordInput, Drawer } from '@mantine/core';
import { DatePicker, DatePickerInput, DateTimePicker } from '@mantine/dates';

export const StyledTextInput = styled(TextInput)`
  margin-bottom: 16px;
  .mantine-TextInput-label {
    margin-bottom: 8px;
  }
`;

export const StyledTextarea = styled(Textarea)`
  margin-bottom: 16px;
  .mantine-Textarea-label {
    margin-bottom: 8px;
  }
`;

export const StyledSelect = styled(Select)`
  margin-bottom: 16px;
  .mantine-Select-label {
    margin-bottom: 8px;
  }
`;

export const StyledPasswordInput = styled(PasswordInput)`
  margin-bottom: 16px;
  .mantine-PasswordInput-label {
    margin-bottom: 8px;
  }
`;

export const StyledDateTimePicker = styled(DateTimePicker)`
  margin-bottom: 16px;
  .mantine-DateTimePicker-label {
    margin-bottom: 8px;
    font-weight: bold;
  }
`;

export const StyledDrawer = styled(Drawer)`
  overflow-y: scroll;
  .mantine-Drawer-title {
    font-weight: 500;
  }
`;

export const StyledLabel = styled.label`
  font-family: poppins, sans-serif;
  -webkit-tap-highlight-color: transparent;
  color: #868e96;
  font-size: inherit;
  line-height: 1.55;
  text-decoration: none;
  margin-bottom: 16px;
`;
