# react-thanos-snap
Thanos snap effect by redstapler wrapped in react

Original Code can be found from https://redstapler.co/thanos-snap-effect-javascript-tutorial/


# How to use

* Run `npm install react-thanos-snap`
* import { SnapWrapper } from 'react-thanos-snap'
* Warp the components in `<SnapWrapper> </SnapWrapper>`
* Click the Thanos Snap Button on the Page
* Props can be used:
  * delay: delay in milliseconds to trigger the snap effect after click Thanos button
  * resume: 0/null - do not resume element automatically , 1/auto - resume element automatically after delay * 10 milliseconds 

# Examples
* Run `npm install && npm start`

# Dependencies
* Production: Jquery, chance, html2canvas, React^16
* Dev: css-loader, url-loader

# Work in Progress
* Able to randomly select a child element and snap!
* Able to randomly select multiple child element and snap in sequences.