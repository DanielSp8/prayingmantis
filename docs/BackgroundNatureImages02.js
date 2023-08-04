const BackgroundNatureImages = [
  require("../src/Images/NatureScenes/aBeautifulHike.jpg"),
  require("../src/Images/NatureScenes/aCrossInTheSky.jpg"),
  require("../src/Images/NatureScenes/aHomeInBeauty.jpg"),
  require("../src/Images/NatureScenes/anIncredibleIsland.jpg"),
  require("../src/Images/NatureScenes/awesomeTree01.jpg"),
  require("../src/Images/NatureScenes/awesomeTree02.jpg"),
  require("../src/Images/NatureScenes/beautifulSunset.jpg"),
  require("../src/Images/NatureScenes/birdsWithSunriseOcean.jpg"),
  require("../src/Images/NatureScenes/brightOceanView.jpg"),
  require("../src/Images/NatureScenes/cometOverHouse.jpg"),
  require("../src/Images/NatureScenes/fadingSunScene.jpg"),
  require("../src/Images/NatureScenes/fallenTrees.jpg"),
  require("../src/Images/NatureScenes/gorgeousViewWithFlowers.jpg"),
  require("../src/Images/NatureScenes/gorgeousWaterfall.jpg"),
  require("../src/Images/NatureScenes/highInTheMountains.jpg"),
  require("../src/Images/NatureScenes/incredibleScene.jpg"),
  require("../src/Images/NatureScenes/incredibleWaterfall.jpg"),
  require("../src/Images/NatureScenes/lighthouse01.jpg"),
  require("../src/Images/NatureScenes/lighthouse02.jpg"),
  require("../src/Images/NatureScenes/moonOverMountains.jpg"),
  require("../src/Images/NatureScenes/oceanTube01.jpg"),
  require("../src/Images/NatureScenes/oceanTube02.jpg"),
  require("../src/Images/NatureScenes/oceanView.jpg"),
  require("../src/Images/NatureScenes/oceanWithRocks.jpg"),
  require("../src/Images/NatureScenes/rockFormationInOcean.jpg"),
  require("../src/Images/NatureScenes/sailboatOnBeach.jpg"),
  require("../src/Images/NatureScenes/trailThroughWilderness.jpg"),
  require("../src/Images/NatureScenes/waterfall01.jpg"),
  require("../src/Images/NatureScenes/waterfall02.jpg"),
  require("../src/Images/NatureScenes/waterfall03.jpg"),
  require("../src/Images/NatureScenes/waterfall04.jpg"),
  require("../src/Images/NatureScenes/winteryMountainScene.jpg"),
  require("../src/Images/NatureScenes/winteryTrail.jpg"),
];

const RandomBackgroundNatureImage =
  BackgroundNatureImages[
    Math.floor(Math.random() * BackgroundNatureImages.length - 1) + 1
  ];

export default RandomBackgroundNatureImage;
