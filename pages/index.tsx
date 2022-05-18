import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/pages/home.module.scss'
import { useEffect, useState } from 'react';
import ParachainResult from '../components/parachain-result/parachain-result'
import {ParachainResultInterface} from '../components/parachain-result/parachain-result'
import currency from 'currency.js';
import DataCategories from '../components/data-categories/data-categories';


type orderType = 'asc' | 'desc' | ''
export interface Category {
  name: string
  label: string
  order: orderType
}

const initStateCategories: Category[] = [
  {name: 'price', label: 'price', order: ''},
  {name: 'marketCap', label: 'Market Capitalization', order: ''},
  {name: 'circulatingSupply', label: 'Circulating Supply', order: ''}
]

const Home: NextPage = () => {
  const [cryptos, setCryptos] = useState<ParachainResultInterface[]>([])
  const [sortingType, setSortingType] = useState(initStateCategories)

  const manipulateData = (rawData: any) => { 
    let refinedData: ParachainResultInterface[] = []
    rawData.map(({name, symbol, quotes, circulatingSupply, id}: any) => {
      const price = currency(quotes[2].price, {precision: 3}).format()
      const marketCap = currency(quotes[2].marketCap, {precision: 2 }).format()
      circulatingSupply = currency(circulatingSupply,  {precision: 0, symbol: '' }).format()
      refinedData.push({
        id,
        name,
        symbol,
        price,
        marketCap,
        circulatingSupply
      })
    })
    return refinedData
  }  

  const fetchData = async () => {
    const resp = await fetch(`https://api.coinmarketcap.com/data-api/v3/cryptocurrency/listing?start=1&limit=50&convert=USD,BTC,ETH&cryptoType=all&tagType=all&audited=false&aux=ath,atl,high24h,low24h,num_market_pairs,cmc_rank,date_added,tags,platform,max_supply,circulating_supply,self_reported_circulating_supply,self_reported_market_cap,total_supply,volume_7d,volume_30d&tagSlugs=polkadot-ecosystem`)
    const results = await resp.json()
    const refinedData = manipulateData(results.data.cryptoCurrencyList)
    setCryptos(refinedData)
  } 

  const sortCryptos = (cat: string, order: orderType) => {
    let cryptosSorted
    if (order === '' || order === 'asc') {
      cryptosSorted = [...cryptos].sort((item1, item2) => currency(item2[cat]).subtract(item1[cat]))
    } else {
      cryptosSorted = [...cryptos].sort((item1, item2) => currency(item1[cat]).subtract(item2[cat]))
    }
    setCryptos(cryptosSorted)
  }
  

  const sortByCategory = (category: Category) => {    
    const categoriesUpdated: Category[] = sortingType.map((item) => {
      if (item !== category) {
        return {
          ...item,
          order: ''
        }
      }
      if (category.order === '' || category.order === 'asc') {
        return {
          ...item,
          order: 'desc'
        }
      } else {
        return {
          ...item,
          order: 'asc'
        }
      }  
    })
    setSortingType(categoriesUpdated)
    sortCryptos(category.name, category.order)
  }

  useEffect(() => {
    fetchData().catch(console.error)
  },[])
    
  return (
    <div className={styles['home-page']}>
      <Head>
        <title>Top Polkadot Ecosystem Token</title>
        <meta name="description" content="See today's latest prices of Polkadot Ecosystem based tokens listed by market capitalization ✔️ 24h volume ✔️ 24h price change ✔️" />
      </Head>
      

      <main className={styles.main}>
        <h1 className={styles.main__title}>Cryptos</h1>
        <DataCategories cat={sortingType} fallback={sortByCategory} />
        {cryptos && cryptos.map((crypto) => {
          return <ParachainResult key={crypto.id} {...crypto}  />
        })}
      </main>
    </div>
  )
}

export default Home
