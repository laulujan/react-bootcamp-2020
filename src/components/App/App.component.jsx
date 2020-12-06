import React, { useState, useEffect } from 'react';

import AuthProvider from '../../providers/Auth/Auth.provider';
import VideoProvider from '../../providers/Video/Video.provider';
import UserPreferencesProvider from '../../providers/Preferences/UserPreferences.provider';
import AppTheme from '../AppTheme/AppTheme';

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
async function initGoogle() {
  await window.gapi.load('client');
  sleep(500);

  window.gapi.client.setApiKey('AIzaSyBd_oEaCH4NFOhmrHj4FtjMeaDMxAr-ppg');

  const x = await window.gapi.client.load('youtube', 'v3');
  window.gapi.load('client:auth2', x);
}

function App() {
  const [loadDependencies, setLoadDependencies] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(window.gapi.client.youtube.search);
      } catch (e) {
        await initGoogle().then(() => {
          setLoadDependencies(true);
        });
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {loadDependencies === true ? (
        <AuthProvider>
          <VideoProvider>
            <UserPreferencesProvider>
              <AppTheme />
            </UserPreferencesProvider>
          </VideoProvider>
        </AuthProvider>
      ) : (
        <div>cargando</div>
      )}
    </div>
  );
}

export default App;
