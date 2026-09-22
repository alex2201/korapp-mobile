import { StyleSheet } from 'react-native';

import { colors, radii, spacing } from '@/theme';

export const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#0B1115',
    flex: 1,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.md,
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
  },
  headerCopy: {
    flex: 1,
    gap: spacing.xs,
  },
  headerDescription: {
    opacity: 0.8,
  },
  closeButton: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.10)',
    borderCurve: 'continuous',
    borderRadius: radii.full,
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  closeButtonPressed: {
    backgroundColor: 'rgba(255, 255, 255, 0.14)',
  },
  cameraContainer: {
    flex: 1,
    overflow: 'hidden',
  },
  camera: {
    flex: 1,
  },
  centeredContent: {
    alignItems: 'center',
    flex: 1,
    gap: spacing.lg,
    justifyContent: 'center',
    padding: spacing['2xl'],
  },
  scanOverlay: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  scanFrame: {
    aspectRatio: 1.75,
    borderColor: colors.brand.accent,
    borderCurve: 'continuous',
    borderRadius: radii.lg,
    borderWidth: 3,
    maxWidth: 420,
    width: '82%',
  },
  processingOverlay: {
    alignItems: 'center',
    backgroundColor: 'rgba(11, 17, 21, 0.68)',
    bottom: 0,
    gap: spacing.lg,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  permissionContent: {
    alignItems: 'center',
    flex: 1,
    gap: spacing.lg,
    justifyContent: 'center',
    padding: spacing['3xl'],
  },
  permissionDescription: {
    maxWidth: 420,
    opacity: 0.82,
    textAlign: 'center',
  },
});
