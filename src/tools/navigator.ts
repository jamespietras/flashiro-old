class Navigator {
  static getCurrentPosition() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }

  static isAvailable() {
    return !!navigator.geolocation;
  }
}

export default Navigator;
