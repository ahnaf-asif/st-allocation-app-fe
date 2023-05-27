import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';

import { store } from '@/Redux/store';
import App from '@/App';
import { customThemeConfig } from '@/Config';
import { Notifications } from '@mantine/notifications';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <MantineProvider theme={customThemeConfig} withGlobalStyles withNormalizeCSS>
        <BrowserRouter>
          <Notifications />
          <App />
        </BrowserRouter>
      </MantineProvider>
    </Provider>
  </React.StrictMode>
);
