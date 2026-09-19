import { forwardRef, useState, type ReactNode } from 'react';
import { TextInput, View, type TextInputProps } from 'react-native';

import { colors, radii, spacing, textStyles } from '@/theme';

import { AppText } from './app-text';

export interface TextFieldProps extends TextInputProps {
  error?: string;
  helperText?: string;
  label?: string;
  leading?: ReactNode;
  trailing?: ReactNode;
}

export const TextField = forwardRef<TextInput, TextFieldProps>(function TextField(
  { editable = true, error, helperText, label, leading, onBlur, onFocus, style, trailing, ...props },
  ref,
) {
  const [focused, setFocused] = useState(false);
  const borderColor = error ? colors.status.error : focused ? colors.brand.accent : colors.border.default;

  return (
    <View style={{ gap: spacing.sm }}>
      {label && <AppText variant="label">{label}</AppText>}
      <View
        style={{
          alignItems: props.multiline ? 'flex-start' : 'center',
          backgroundColor: colors.background.default,
          borderColor,
          borderCurve: 'continuous',
          borderRadius: radii.md,
          borderWidth: 1.5,
          flexDirection: 'row',
          gap: spacing.sm,
          minHeight: props.multiline ? 112 : 44,
          opacity: editable ? 1 : 0.6,
          paddingHorizontal: spacing.md,
        }}
      >
        {leading}
        <TextInput
          {...props}
          accessibilityLabel={props.accessibilityLabel ?? label}
          accessibilityState={{ disabled: !editable }}
          editable={editable}
          onBlur={(event) => { setFocused(false); onBlur?.(event); }}
          onFocus={(event) => { setFocused(true); onFocus?.(event); }}
          placeholderTextColor={colors.text.muted}
          ref={ref}
          style={[
            textStyles.bodySmall,
            { color: colors.text.primary, flex: 1, paddingVertical: 10, textAlignVertical: props.multiline ? 'top' : 'center' },
            style,
          ]}
        />
        {trailing}
      </View>
      {(error || helperText) && (
        <AppText selectable={Boolean(error)} tone={error ? 'error' : 'muted'} variant="caption">
          {error ?? helperText}
        </AppText>
      )}
    </View>
  );
});
