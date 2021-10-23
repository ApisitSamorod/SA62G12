#!/bin/bash

npx create-react-app frontend --template typescript
cd frontend

npm install --save @types/react-router-dom
npm install --save react-router-dom

npm install @material-ui/core
npm install @material-ui/icons
npm install @material-ui/pickers
npm install @date-io/date-fns@1.x date-fns

npm install @material-ui/lab
npm install moment

cd ..
