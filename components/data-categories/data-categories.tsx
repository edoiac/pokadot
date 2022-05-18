import React from 'react';
import styles from '../../styles/components/data-categories.module.scss'
import {Category} from '../../pages/index'

interface DataCategoriesInterface {
	fallback: (category: Category) => void,
	cat: Category[]
}

const DataCategories: React.FC<DataCategoriesInterface> = ({fallback, cat}) => {

	return (
		<div className={styles['data-categories']}>
			<div className={styles['data-categories-name']}>Name</div>
			{cat.map(cat => <div key={cat.name} className={[styles['data-categories-label'], styles[`${cat.order}`]].join(' ')} onClick={() => { fallback(cat) }}>{cat.label}</div> )}
		</div>
	);
};

export default DataCategories;