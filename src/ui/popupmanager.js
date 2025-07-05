export default class PopupManager {
  constructor(scene) {
    this.scene = scene;
    this.activePopups = new Set();
  }

  register(popup) {
    this.activePopups.add(popup);
    return popup;
  }

  unregister(popup) {
    this.activePopups.delete(popup);
  }

  hideAll() {
    this.activePopups.forEach(popup => {
      if (popup.hide) popup.hide();
    });
  }

  showOnly(popupToShow) {
    this.activePopups.forEach(popup => {
      if (popup === popupToShow && popup.show) {
        popup.show();
      } else if (popup.hide) {
        popup.hide();
      }
    });
  }
}
