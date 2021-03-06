#!/bin/bash

npx create-react-app frontend --template typescript
cd frontend

npm install --save @types/react-router-dom
npm install --save react-router-dom

npm install @mui/material @emotion/react @emotion/styled
npm install @mui/icons-material
#npm install @material-ui/pickers
npm install @date-io/date-fns@1.x date-fns

npm install @mui/lab
npm install moment

cd ..
