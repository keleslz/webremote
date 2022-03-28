// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';
import React, { Suspense } from "react";


const WebRemote = React.lazy(() => import('web_remote/App')); // 1st remote app
const RemoteApp = React.lazy(() => import('remote_app/App')); // 2nd remote app

export function App() {

  const Loader = () => <div>loading...</div>

  return (
    <>
      <h1>Welcome to the futur - Web local app port 4200</h1>

      <Suspense fallback={<Loader />}>
        <WebRemote />
      </Suspense>

      <Suspense fallback={<Loader />}>
        <RemoteApp />
      </Suspense>
    </>
  );
}

export default App;
