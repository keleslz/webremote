// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';
import React, { Suspense } from "react";


const RemoteApp = React.lazy(() => import('remote/App'));
// const RemoteApp2 = React.lazy(() => import('remote2/App2'));

export function App() {
  // console.log(RemoteApp._result)
  // console.log(RemoteApp2)

  const Loader = () => <div>loading...</div>

  return (
    <>
      <h1>Welcome to the futur - Web local app</h1>

      <div>
        <Suspense fallback={<Loader />}>
          <RemoteApp />
        </Suspense>
      </div>

      <div>
        <Suspense fallback={<Loader />}>
          <RemoteApp2 />
        </Suspense>
      </div>
    </>
  );
}

export default App;
