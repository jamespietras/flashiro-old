export const TOGGLED_SIDEBAR = 'sidebar:toggled';

export function toggleSidebar() {
  return (dispatch) => {
    dispatch({
      type: TOGGLED_SIDEBAR,
    });
  };
}
