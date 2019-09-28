import React, { useState, useEffect } from 'react';
import connect from '@vkontakte/vk-connect';
import View from '@vkontakte/vkui/dist/components/View/View';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import '@vkontakte/vkui/dist/vkui.css';
import Icon24Home from '@vkontakte/icons/dist/24/home';
import Icon24Report from '@vkontakte/icons/dist/24/report';
import Icon24Smile from '@vkontakte/icons/dist/24/smile';
import Persik from './panels/Persik';
import {Pets} from './app/Pets';
import {Epic, Tabbar, TabbarItem} from "@vkontakte/vkui";
import PawBlack from './assets/pawBlack.png';
import Paw from './assets/paw.png';
import shelter from './assets/shelter.png';
import shelterBlack from './assets/shelterBlack.png';


const App = () => {
	const [activePanel, setActivePanel] = useState('pets');
	const [fetchedUser, setUser] = useState(null);
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />);

	useEffect(() => {
		connect.subscribe(({ detail: { type, data }}) => {
			if (type === 'VKWebAppUpdateConfig') {
				const schemeAttribute = document.createAttribute('scheme');
				schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
				document.body.attributes.setNamedItem(schemeAttribute);
			}
		});
		async function fetchData() {
			const user = await connect.sendPromise('VKWebAppGetUserInfo');
			setUser(user);
			setPopout(null);
		}
		fetchData();
	}, []);

	const go = e => {
		setActivePanel(e.currentTarget.dataset.story);
	};

	return (
		<Epic activeStory={activePanel} tabbar={
			<Tabbar>
				<TabbarItem
					onClick={go}
					style={{
						backgroundColor: activePanel === 'pets' ? 'rgb(29,9,98)' : '#fff',
						color: activePanel === 'pets' ? 'white' : 'inherit'
					}}
					selected={activePanel === 'pets'}
					data-story={'pets'}
					text={activePanel === 'pets' ? 'Питомцы' : ''}
				><div style={{
					width: 32,
					height: 32,
					marginRight: 8,
					backgroundImage: activePanel === 'pets' ? `url(${Paw})` : `url(${PawBlack})`,
					backgroundSize: '32px 32px',
					backgroundRepeat: 'no-repeat',
					backgroundPosition: 'center'
				}}/></TabbarItem>
				<TabbarItem
					onClick={go}
					style={{
						backgroundColor: activePanel === 'shelters' ? 'rgb(29,9,98)' : '#fff',
						color: activePanel === 'shelters' ? 'white' : 'inherit'
					}}
					selected={activePanel === 'shelters'}
					data-story={'shelters'}
					text={activePanel === 'shelters' ? 'Приюты' : ''}
				><div style={{
					width: 32,
					height: 32,
					marginRight: 8,
					backgroundImage: activePanel === 'shelters' ? `url(${shelter})` : `url(${shelterBlack})`,
					backgroundSize: '32px 32px',
					backgroundRepeat: 'no-repeat',
					backgroundPosition: 'center'
				}}/></TabbarItem>
			</Tabbar>
		}>
			<View activePanel={'pets'} id={'pets'}>
				<Pets id='pets'/>
			</View>
		</Epic>

	);
}

export default App;

