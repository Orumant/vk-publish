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
					selected={activePanel === 'pets'}
					data-story={'people'}
					text={'Питомцы'}
				><Icon24Home/></TabbarItem>
				<TabbarItem
					onClick={go}
					selected={activePanel === 'shelters'}
					data-story={'shelters'}
					text={'Приюты'}
				><Icon24Smile/></TabbarItem>
			</Tabbar>
		}>
			<View activePanel={'pets'} id={'pets'}>
				<Pets id='pets' go={go} />
			</View>
		</Epic>

	);
}

export default App;

