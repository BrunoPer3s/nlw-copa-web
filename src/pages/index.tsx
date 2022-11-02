import Image from 'next/image'
import logoImg from '../assets/logo-img.svg'
import avatarImg from '../assets/avatar-img.png'
import phoneImg from '../assets/phone-img.png'
import { CheckCircle } from 'phosphor-react'
import { api } from '../lib/axios'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'

interface HomeProps {
  poolsCount: number
  guessesCount: number
  usersCount: number
}

export default function Home({ poolsCount, guessesCount, usersCount }: HomeProps) {
  const [poolTitle, setPoolTitle] = useState('')

  async function handleCreatePool(event: FormEvent) {
    event.preventDefault()
    try {
      const response = await api.post('/pools', {
        title: poolTitle
      })

      const { code } = response.data

      await navigator.clipboard.writeText(code)

      alert('O Bolão foi criado com sucesso, o código foi copiado para a área de transferência!')
      setPoolTitle('')

    } catch (err) {
      alert('falha ao criar o bolão, tente novamente!')
    }
  }

  return (
    <div className='max-w-[375px] flex items-center w-full h-screen mx-auto text-center px-4 tablet:max-w-[490px] tablet:text-left tablet:flex tablet:items-center tablet:px-0 desktop:max-w-[1124px] desktop:justify-between desktop:px-4'>
      <main className='flex flex-col mt-4 tablet:mt-0 gap-8 tablet:gap-0 tablet:py-0  desktop:max-w-[490px]'>
        <header className='flex justify-center tablet:justify-start'>
          <Image src={logoImg} alt="nlw Copa" />
        </header>
        <h1 className='text-white text-2xl font-bold tablet:text-5xl tablet:text-start tablet:mt-[60px] tablet:mb-[40px] tablet:leading-tight'>Crie seu próprio bolão da copa e compartilhe entre amigos!</h1>
        <div className='flex items-center justify-around tablet:mb-[40px]'>
          <div className='flex'>
            <Image src={avatarImg} alt="avatar" />
            <Image className='ml-[-25px]' src={avatarImg} alt="avatar" />
            <Image className='ml-[-25px] hidden tablet:block' src={avatarImg} alt="avatar" />
            <Image className='ml-[-25px] hidden tablet:block' src={avatarImg} alt="avatar" />
          </div>
          <div>
            <strong className='text-gray-100 tablet:text-xl'>
              <span className='text-green-500'>+{usersCount} </span>
              pessoas já estão usando
            </strong>
          </div>
        </div>
        <form onSubmit={handleCreatePool} className='flex flex-col gap-4 tablet:flex-row'>
          <input
            className='px-6 py-4 bg-gray-800 border border-gray-700 text-sm text-gray-200 rounded tablet:flex-1'
            type="text"
            onChange={e => setPoolTitle(e.target.value)}
            value={poolTitle}
            placeholder='Qual o nome do bolão ?'
            required
          />
          <button
            className='bg-yellow-500 px-6 h-[55px] flex items-center justify-center font-bold text-black text-sm uppercase rounded'
            type='submit'>
            criar meu bolão
          </button>
        </form>
        <p className='text-sm text-gray-600 leading-[160%] tablet:mt-[16px] tablet:mb-[40px]'>Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas 🚀</p>
        <footer>
          <ul className='flex justify-around items-center pt-8 border-t border-t-gray-600'>
            <li className='flex items-center  gap-[10px] tablet:gap-6'>
              <CheckCircle className='text-white text-[40px] tablet:text-5xl' weight='fill' fill='#129E57' />
              <div className='flex flex-col items-start'>
                <span className='text-gray-100 font-bold tablet:text-2xl'>+{poolsCount}</span>
                <span className='text-gray-100 text-xs tablet:text-base'>Bolões criados</span>
              </div>
            </li>
            <div className='h-14 bg-gray-600 w-px'></div>
            <li className='flex items-center  gap-[10px] tablet:gap-6'>
              <CheckCircle className='text-whit text-[40px] tablet:text-5xl' weight='fill' color='#129E57' />
              <div className='flex flex-col items-start'>
                <span className='text-gray-100 font-bold tablet:text-2xl'>+{guessesCount}</span>
                <span className='text-gray-100 text-xs tablet:text-base'>Palpites enviados</span>
              </div>
            </li>
          </ul>
        </footer>
      </main>
      <Image className='hidden desktop:block' src={phoneImg} alt="Imagem de previsão" />
    </div>
  )
}

export const getServerSideProps = async () => {
  const [poolsCountResponse, guessesCountResponse, usersCountResponse] = await Promise.all([
    api.get('pools/count'),
    api.get('guesses/count'),
    api.get('users/count'),
  ])

  return {
    props: {
      poolsCount: poolsCountResponse.data.poolsCount,
      guessesCount: guessesCountResponse.data.guessesCount,
      usersCount: usersCountResponse.data.usersCount,
    }
  }
}