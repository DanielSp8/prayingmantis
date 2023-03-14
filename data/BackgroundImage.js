const BackgroundImages = [
  require("../src/Images/PrayingMantis1.jpg"),
  require("../src/Images/PrayingMantis2.jpg"),
  require("../src/Images/PrayingMantis3.jpg"),
  require("../src/Images/PrayingMantis4.jpg"),
  require("../src/Images/PrayingMantis5.jpg"),
  require("../src/Images/PrayingMantis6.jpg"),
  require("../src/Images/PrayingMantis7.jpg"),
  require("../src/Images/PrayingMantis8.jpg"),
  require("../src/Images/PrayingMantis9.jpg"),
  require("../src/Images/PrayingMantis10.jpg"),
  require("../src/Images/PrayingMantis11.jpg"),
];

const RandomBackImage =
  BackgroundImages[Math.floor(Math.random() * BackgroundImages.length) + 1];

export default RandomBackImage;
