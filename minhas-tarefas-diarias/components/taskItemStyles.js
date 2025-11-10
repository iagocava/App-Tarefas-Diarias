import { StyleSheet } from 'react-native';

export const taskItemStyles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 12,
    marginVertical: 6,
    borderRadius: 8,
    borderLeftWidth: 5,
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statusButton: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    fontWeight: '500',
  },
  statusText: {
    color: '#fff',
    fontweight: '600',
    fontSize: 14,
    textAlign: 'center',
  },
});