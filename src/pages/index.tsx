interface HomeProps {
  count: number;
}

export default function Home({ count }: HomeProps) {
  return (
    <h1 className="text-2xl text-white">{count}</h1>
  )
}

export const getServerSideProps = async () => {
  const response = await fetch('http://localhost:3333/pools/count')
  const data = await response.json()

  return {
    props: {
      count: data.poolsCount
    }
  }
}
