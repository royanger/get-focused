import Container from '~/components/container';
import Button from '~/components/button';
import { HeaderOne, HeaderTwo } from '~/components/headlines';

export default function DailyPlanner() {
  return (
    <>
      <Container>
        <div className='mt-8'>
          <HeaderOne>Daily Planner</HeaderOne>

          <HeaderTwo>How do you feel?</HeaderTwo>
          <p>Rate how you are feeling out of 10.</p>
          <div className='flex-shrink flex'>
            <div className='grid grid-cols-10 mb-6'>
              <div>
                <input type='radio' />
              </div>
              <div>
                <input type='radio' />
              </div>
              <div>
                <input type='radio' />
              </div>
              <div>
                <input type='radio' />
              </div>
              <div>
                <input type='radio' />
              </div>
              <div>
                <input type='radio' />
              </div>
              <div>
                <input type='radio' />
              </div>
              <div>
                <input type='radio' />
              </div>
              <div>
                <input type='radio' />
              </div>
              <div>
                <input type='radio' />
              </div>

              <div>1</div>
              <div>2</div>
              <div>3</div>
              <div>4</div>
              <div>5</div>
              <div>6</div>
              <div>7</div>
              <div>8</div>
              <div>9</div>
              <div>10</div>
            </div>
          </div>

          <HeaderTwo>Did you exercise today?</HeaderTwo>
          <div>
            <input type='checkbox' /> Yes
          </div>
          <div>
            <input type='checkbox' /> No
          </div>

          <HeaderTwo>What is your most important goal(s) today?</HeaderTwo>
          <p>Try to focus on one goal, but you can focus on a few.</p>

          <div>
            <div className='flex flex-row items-center'>
              <div className='flex-grow flex'>
                <input
                  className='border-2 border-purple p-2 text-black rounded flex-grow'
                  type='text'
                  placeholder='Important Goals'
                  aria-label='Important Goals'
                />
              </div>
              <div className='w-8 flex flex-row justify-center '>
                <input type='checkbox' />
              </div>
              <div className='w-32 flex flex-row justify-center '>
                <div className='flex-grow justify-center items-center flex '>
                  <input type='radio' />
                </div>
                <div className='flex-grow justify-center items-center flex '>
                  <input type='radio' />
                </div>
                <div className='flex-grow justify-center items-center flex '>
                  <input type='radio' />
                </div>
                <div className='flex-grow justify-center items-center flex '>
                  <input type='radio' />
                </div>
                <div className='flex-grow justify-center items-center flex '>
                  <input type='radio' />
                </div>
              </div>
              <div className='w-8 flex flex-row justify-center '>
                <input type='checkbox' />
              </div>
            </div>
            <div className='flex flex-row items-center'>
              <div className='flex-grow'></div>
              <div className='text-xs w-8 flex flex-row justify-center '>
                Target
              </div>
              <div className='text-xs w-32 flex flex-row justify-center '>
                Track your time
              </div>
              <div className='text-xs w-8 flex flex-row justify-center '>
                Actual
              </div>
            </div>
          </div>

          <Button type='submit' title='Save' />

          <Button type='submit' title='Cancel' variant='cancel' />

          <HeaderTwo>Important Goals and Tasks</HeaderTwo>
          <p>
            These tasks and goals are secondary to your most important goal, but
            are things you really want to finish today.
          </p>

          <HeaderTwo>Bonus Goals and Tasks</HeaderTwo>
          <p>
            If you finish all of the above tasks and goals, what are some tasks
            that would be awesome to finish today?
          </p>

          <HeaderTwo>Notes</HeaderTwo>
          <p>
            Jot down any notes. These will be shown on the Weekly Review and can
            be accessed through your dashboard.
          </p>
          <input
            type='textarea'
            className='w-full h-36 border-2 border-purple rounded'
          />
          <Button type='submit' title='Save' />

          <Button type='submit' title='Cancel' variant='cancel' />

          <HeaderTwo>Productivity Score?</HeaderTwo>
          <p>Rate how you productive you felt out of 10.</p>
          <div className='flex-shrink flex'>
            <div className='grid grid-cols-10 mb-6'>
              <div>
                <input className='mx-2' type='radio' />
              </div>
              <div>
                <input type='radio' />
              </div>
              <div>
                <input type='radio' />
              </div>
              <div>
                <input type='radio' />
              </div>
              <div>
                <input type='radio' />
              </div>
              <div>
                <input type='radio' />
              </div>
              <div>
                <input type='radio' />
              </div>
              <div>
                <input type='radio' />
              </div>
              <div>
                <input type='radio' />
              </div>
              <div>
                <input type='radio' />
              </div>
              <div>1</div>
              <div>2</div>
              <div>3</div>
              <div>4</div>
              <div>5</div>
              <div>6</div>
              <div>7</div>
              <div>8</div>
              <div>9</div>
              <div>10</div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
