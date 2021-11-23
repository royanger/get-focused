import type { MetaFunction } from 'remix';

// https://remix.run/api/conventions#meta
export let meta: MetaFunction = () => {
  return {
    title: 'Get Focused',
    description:
      'Focus on the tasks you need to complete in way that will boost your productivity',
  };
};

// https://remix.run/guides/routing#index-routes
export default function Index() {
  return (
    <div className='remix__page'>
      <main>
        <h2 className='text-5xl text-purple-300'>Welcome to Get Focused</h2>
      </main>
      <aside>
        <h2>Get Started</h2>
        <ul>
          <li key='login'>Login</li>
        </ul>
      </aside>
    </div>
  );
}
