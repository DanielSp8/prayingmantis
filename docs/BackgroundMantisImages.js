const BackgroundImages = [
  require("../src/Images/PrayingMantis/PrayingMantis1.jpg"),
  require("../src/Images/PrayingMantis/PrayingMantis2.jpg"),
  require("../src/Images/PrayingMantis/PrayingMantis3.jpg"),
  require("../src/Images/PrayingMantis/PrayingMantis4.jpg"),
  require("../src/Images/PrayingMantis/PrayingMantis5.jpg"),
  require("../src/Images/PrayingMantis/PrayingMantis6.jpg"),
  require("../src/Images/PrayingMantis/PrayingMantis7.jpg"),
  require("../src/Images/PrayingMantis/PrayingMantis8.jpg"),
  require("../src/Images/PrayingMantis/PrayingMantis9.jpg"),
  require("../src/Images/PrayingMantis/PrayingMantis10.jpg"),
  require("../src/Images/PrayingMantis/PrayingMantis11.jpg"),
];

const RandomBackImage =
  BackgroundImages[Math.floor(Math.random() * BackgroundImages.length - 1) + 1];

export default RandomBackImage;
