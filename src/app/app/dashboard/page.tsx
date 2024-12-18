import { Stats } from "@/app/components";

export default function Page() {
  return (
    <main className='mx-7'>
      <div className='flex items-center justify-between text-white py-8'>
        <section>
          <h1 className='font-medium text-2xl leading-6'>
            Daycare Pet <span className='font-semibold'>shop</span>
          </h1>
          <p>
            Manage your <span className='font-extrabold'> pet daycare </span>
            with ease and love.
          </p>
        </section>

        <Stats />
      </div>
    </main>
  );
}