import React from 'react';
import styles from '../../styles/components/parachain-result.module.scss'

export interface ParachainResultInterface {
	id: number
	name: string
	symbol: string
	price: string
	marketCap: string
	circulatingSupply: string
}

const ParachainResult: React.FC<ParachainResultInterface> = ({name, symbol, price, marketCap, circulatingSupply}) => {
	return (
		<div className={styles['parachain-result']}>
			<div className={styles['parachain-result__container']}>
				<div className={styles['parachain-result__text']}>
					<span className={styles['parachain-result-name']}>{name} </span>
					<span className={styles['parachain-result-symbol']}>{symbol}</span>
				</div>
				<div className={styles['parachain-result-price']}>{price}</div>
					<div className={styles['parachain-result-cap']}>{marketCap}</div>
					<div className={styles['parachain-result-circulating']}>{circulatingSupply} {symbol}</div>

			</div>
		</div>
	);
};

export default ParachainResult;