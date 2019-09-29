import React, {useState, useEffect} from 'react';
import View from '@vkontakte/vkui/dist/components/View/View';
import '@vkontakte/vkui/dist/vkui.css';
import {
    Button,
    Cell,
    Div,
    Epic,
    FormLayout, Group,
    Header, HeaderButton, IOS, Link,
    List, ModalCard, ModalRoot,
    Panel,
    PanelHeader,
    platform,
    Select,
    Tabbar,
    TabbarItem
} from "@vkontakte/vkui";
import PawBlack from './assets/pawBlack.png';
import Paw from './assets/paw.png';
import shelterImg from './assets/shelter.png';
import shelterBlack from './assets/shelterBlack.png';
import Icon28HelpOutline from '@vkontakte/icons/dist/28/help_outline';
import Icon24Place from '@vkontakte/icons/dist/24/place';
import Icon24Like from '@vkontakte/icons/dist/24/like';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon56UsersOutline from '@vkontakte/icons/dist/56/users_outline';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import Dog from './assets/dog.png';
import DogDark from './assets/dogDark.png';
import CatDark from './assets/catDark.png';
import Cat from './assets/cat.png';
import {usePets} from "./hooks/Pets";
import {useShelters} from "./hooks/Shelters";


const App = () => {
    const [activeStory, setActiveStory] = useState('pets');
    const [filter, setFilter] = useState({});
    const [petsPage, setPetsPage] = useState(0);
    const [pets, setFilters] = usePets(petsPage, 20);
    const [pet, setPet] = useState(void 0);
    const [activePanel, setActivePanel] = useState('main');

    const [activeSheltersPanel, setActiveSheltersPanel] = useState('sheltersPanel');
    const [sheltersPage, setSheltersPage] = useState(0);
    const [sheltersFilter, setSheltersFilter] = useState({});
    const [shelters, setSheltersFilters] = useShelters(sheltersPage);
    const [shelter, setShelter] = useState(void 0);
    const [activeModal, setActiveModal] = useState(null);

    const osname = platform();

    useEffect(() => {
        setFilters(filter);
    }, [filter]);

    useEffect(() => {
        setSheltersFilters(sheltersFilter);
    }, [sheltersFilter]);

    const go = e => {
        setActiveStory(e.currentTarget.dataset.story);
    };

    function handleGenusChange(value) {
        return function () {
            if ((filter.genus === 'cat' || filter.genus === 'dog') && value === filter.genus) {
                let {genus, ...newFilter} = filter;
                setFilter(newFilter);
            } else
                setFilter({...filter, genus: value});
        }
    }

    function handleCityChange({target: {value}}) {
        if (value != null) {
            setFilter({...filter, city: value})
        } else {
            let {city, ...newFilter} = filter;
            setFilter(newFilter);
        }
    }

    function handleShelterCityChange({target: {value}}) {
        if (value != null) {
            setSheltersFilter({...sheltersFilter, city: value})
        } else {
            let {city, ...newFilter} = sheltersFilter;
            setSheltersFilter(newFilter);
        }
    }

    function handlePetCardOpening(pet) {
        return function () {
            setPet(pet);
            setActivePanel('pet');
        }
    }

    function handlePetCardClosing() {
        setPet(void 0);
        setActivePanel('main');
    }

    function handleShelterCardOpening(shelter) {
        return function () {
            setShelter(shelter);
            setActiveSheltersPanel('shelterPanel');
        }
    }

    function handleShelterCardClosing() {
        setShelter(void 0);
        setActiveSheltersPanel('sheltersPanel');
    }

    function fetchMore() {
        if (pets.length > 0) {
            let nextPage = petsPage + 1;
            setPetsPage(nextPage);
            setFilter({...filter, page: nextPage})
        } else {
            setPetsPage(0);
            setFilter({...filter, page: 0})
        }
        window.scrollTo(0, 0)
    }

    function fetchMoreShelters() {
        if (shelters.length > 0) {
            let nextPage = sheltersPage + 1;
            setSheltersPage(nextPage);
            setSheltersFilter({...sheltersFilter, page: nextPage})
        } else {
            setSheltersPage(0);
            setSheltersFilter({...sheltersFilter, page: 0})
        }
        window.scrollTo(0, 0)
    }

    return (
        <Epic activeStory={activeStory} tabbar={
            <Tabbar>
                <TabbarItem
                    onClick={go}
                    style={{
                        backgroundColor: activeStory === 'pets' ? 'rgb(29,9,98)' : '#fff',
                        color: activeStory === 'pets' ? 'white' : 'inherit'
                    }}
                    selected={activeStory === 'pets'}
                    data-story={'pets'}
                    text={activeStory === 'pets' ? 'Питомцы' : ''}
                >
                    <div style={{
                        width: 32,
                        height: 32,
                        marginRight: 8,
                        backgroundImage: activeStory === 'pets' ? `url(${Paw})` : `url(${PawBlack})`,
                        backgroundSize: '32px 32px',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center'
                    }}/>
                </TabbarItem>
                <TabbarItem
                    onClick={go}
                    style={{
                        backgroundColor: activeStory === 'shelters' ? 'rgb(29,9,98)' : '#fff',
                        color: activeStory === 'shelters' ? 'white' : 'inherit'
                    }}
                    selected={activeStory === 'shelters'}
                    data-story={'shelters'}
                    text={activeStory === 'shelters' ? 'Приюты' : ''}
                >
                    <div style={{
                        width: 32,
                        height: 32,
                        marginRight: 8,
                        backgroundImage: activeStory === 'shelters' ? `url(${shelterImg})` : `url(${shelterBlack})`,
                        backgroundSize: '32px 32px',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center'
                    }}/>
                </TabbarItem>
            </Tabbar>
        }>
            <View activePanel={activePanel} id={'pets'}>
                <Panel id={'help'} theme={'white'}>
                    <Div>

                    </Div>
                </Panel>
                <Panel id={'main'} theme={'white'}>
                    <PanelHeader theme={'light'} noShadow>
                        Pet The Pet
                    </PanelHeader>
                    <Header
                        level={'secondary'}
                        aside={<Icon28HelpOutline/>}
                    >Питомцы</Header>
                    <FormLayout>
                        <Select value={filter.city}
                                onChange={handleCityChange}
                                top={'Город'}
                                placeholder={'Не выбран'}>
                            <option value={'Санкт-Петербург'}>Санкт-Петербург</option>
                            <option value={'Москва'}>Москва</option>
                            <option value={'Всеволожск'}>Всеволожск</option>
                        </Select>
                    </FormLayout>
                    <Div style={{display: 'inline-flex'}}>
                        <Div
                            style={{display: 'flex', width: 60, flexWrap: 'wrap'}}
                        >
                            <div style={{
                                height: 60,
                                flexBasis: '100%',
                                width: 60,
                                cursor: 'pointer',
                                backgroundColor: filter.genus === 'dog' ? 'rgb(29,9,98)' : '#fff',
                                borderRadius: 8,
                                backgroundImage: filter.genus === 'dog' ? `url(${Dog})` : `url(${DogDark})`,
                                backgroundSize: '50px 50px',
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'center'
                            }}
                                 onClick={handleGenusChange('dog')}
                            />
                            <div>Собаки</div>
                        </Div>
                        <Div
                            style={{display: 'flex', justifyContent: 'center', width: 60, flexWrap: 'wrap'}}
                        >
                            <div style={{
                                height: 60,
                                flexBasis: '100%',
                                width: 60,
                                cursor: 'pointer',
                                backgroundColor: filter.genus === 'cat' ? 'rgb(29,9,98)' : '#fff',
                                borderRadius: 8,
                                backgroundImage: filter.genus === 'cat' ? `url(${Cat})` : `url(${CatDark})`,
                                backgroundSize: '50px 50px',
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'center'
                            }}
                                 onClick={handleGenusChange('cat')}/>
                            <div>Кошки</div>
                        </Div>
                    </Div>
                    <List style={{width: '100%'}}>
                        {pets.map(current => (
                            <Cell
                                key={current.id}
                                size={'l'}
                                onClick={handlePetCardOpening(current)}
                                asideContent={
                                    <Icon24Like
                                        style={{color: current.sex ? 'rgb(174,221,240)' : '#F2D0E5'}}
                                    />
                                }
                                description={
                                    <div style={{display: 'flex', width: '100%', flexWrap: 'wrap'}}>
                                        <Div
                                            style={{flexBasis: '98%', marginLeft: 4}}
                                        >{current.age ? `${current.age} лет` : 'В рассвете сил'}</Div>
                                        <Div style={{display: 'flex', alignContent: 'center'}}>
                                            <Icon24Place height={16} width={16}/>
                                            <span>{current.shelterName}</span>
                                        </Div>
                                    </div>
                                }
                                before={<div style={{
                                    height: 130,
                                    width: 130,
                                    borderRadius: 16,
                                    marginRight: 16,
                                    backgroundImage: `url(${current.photo})`,
                                    backgroundSize: '100% auto',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'center'

                                }}/>}
                            >{current.name}</Cell>
                        ))}
                    </List>
                    <Button
                        size="xl"
                        level={'secondary'}
                        onClick={fetchMore}
                        style={{margin: '8px 0'}}>{pets.length > 0 ? 'Ещё' : 'В начало'}</Button>
                </Panel>
                <Panel id={'pet'} theme={'white'}>
                    <PanelHeader
                        theme={'light'}
                        left={
                            <HeaderButton data-to={'main'} onClick={handlePetCardClosing}>
                                {osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
                            </HeaderButton>
                        }
                        addon={
                            <HeaderButton
                                onClick={handlePetCardClosing}
                            >Назад</HeaderButton>
                        }
                    >
                        Pet The Pet
                    </PanelHeader>
                    {pet && (
                        <>
                            <Group>
                                <Div
                                    style={{
                                        backgroundImage: `url(${pet.photo})`,
                                        // width: '100%',
                                        height: 300,
                                        backgroundRepeat: 'no-repeat',
                                        backgroundSize: 'auto 100%',
                                        backgroundPosition: 'center'
                                    }}
                                />
                            </Group>
                            <Header aside={<Button component="a" href={pet.payLink}>Помочь</Button>}>
                                {pet.name}
                            </Header>
                            <Header level={'secondary'}>
                                {pet.age ? `${pet.age} лет` : 'в рассвете сил'}
                            </Header>
                            <Div>
                                {pet.description}
                            </Div>
                            <Div style={{display: 'flex'}}>
                                <Button
                                    component={'a'}
                                    href={pet.chatLink}
                                    stretched>Забрать домой</Button>
                                <Button
                                    component={'a'}
                                    href={pet.chatLink}
                                    stretched
                                    style={{marginLeft: 8}}>Познакомиться</Button>
                            </Div>
                        </>
                    )}
                </Panel>
            </View>
            <View activePanel={activeSheltersPanel}
                  modal={
                      <ModalRoot activeModal={activeModal}>
                          <ModalCard id={'modal'}
                                     icon={<Icon56UsersOutline/>}
                                     title={'Нам необходима любая помощь'}
                                     onClose={() => setActiveModal(null)}>
                              {shelter && <Group>
                                  <List>
                                      {shelter.needFeed && <Cell>Накормить</Cell>}
                                      {shelter.needHands && <Cell>Почистить вольеры</Cell>}
                                      {shelter.needTransport && <Cell>Перевозка на своем авто</Cell>}
                                      {shelter.needWalk && <Cell>Выгулять</Cell>}
                                      {shelter.needRepair && <Cell>Починить/отремонтировать</Cell>}
                                      {shelter.needOverexposure && <Cell>Взять на передержку</Cell>}
                                      {shelter.canPhotoSession && <Cell>Сделать фотосессию</Cell>}
                                      {shelter.needGrooming && <Cell>Подстричь (груминг)</Cell>}
                                      {shelter.needGroupDesignHelp && <Cell>Оформить страничку группы</Cell>}
                                      {shelter.needMedHelp && <Cell>Медицинская помощь и медикаменты</Cell>}
                                  </List>
                                  <Button stretched component={'a'} href={shelter.chatLink}>Помочь делом</Button>
                              </Group>}
                          </ModalCard>
                      </ModalRoot>
                  }
                  id={'shelters'}>
                <Panel id={'sheltersPanel'} theme={'white'}>
                    <PanelHeader theme={'light'} noShadow>
                        Pet The Pet
                    </PanelHeader>
                    <Header
                        level={'secondary'}
                        aside={<Icon28HelpOutline/>}
                    >Приюты</Header>
                    <FormLayout>
                        <Select value={sheltersFilter.city}
                                onChange={handleShelterCityChange}
                                top={'Город'}
                                placeholder={'Не выбран'}>
                            <option value={'Санкт-Петербург'}>Санкт-Петербург</option>
                            <option value={'Москва'}>Москва</option>
                            <option value={'Всеволожск'}>Всеволожск</option>
                        </Select>
                    </FormLayout>
                    <List style={{width: '100%'}}>
                        {shelters.map(curShelter => (
                            <Cell
                                onClick={handleShelterCardOpening(curShelter)}
                                description={
                                    <div style={{display: 'flex', width: '100%', flexWrap: 'wrap'}}>
                                        <Div style={{display: 'flex', alignContent: 'center'}}>
                                            <Icon24Place height={16} width={16}/>
                                            <span>{curShelter.city}</span>
                                        </Div>
                                    </div>
                                }
                                before={<div style={{
                                    height: 130,
                                    width: 130,
                                    borderRadius: 16,
                                    marginRight: 16,
                                    backgroundImage: `url(${curShelter.logo})`,
                                    backgroundSize: '130px 130px',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'center'

                                }}/>}
                                size={'l'}
                                key={curShelter.id}>{curShelter.name}</Cell>
                        ))}
                    </List>
                    <Button
                        size="xl"
                        level={'secondary'}
                        onClick={fetchMoreShelters}
                        style={{margin: '8px 0'}}>{shelters.length > 0 ? 'Ещё' : 'В начало'}</Button>
                </Panel>
                <Panel id={'shelterPanel'} theme={'white'}>
                    <PanelHeader
                        theme={'light'}
                        left={
                            <HeaderButton data-to={'sheltersPanel'} onClick={handleShelterCardClosing}>
                                {osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
                            </HeaderButton>
                        }
                        addon={
                            <HeaderButton
                                onClick={handleShelterCardClosing}
                            >Назад</HeaderButton>
                        }
                    >
                        Pet The Pet
                    </PanelHeader>
                    {shelter && (
                        <>
                            <Group>
                                <Div
                                    style={{
                                        backgroundImage: `url(${shelter.logo})`,
                                        height: 300,
                                        backgroundRepeat: 'no-repeat',
                                        backgroundSize: 'auto 100%',
                                        backgroundPosition: 'center'
                                    }}
                                />
                            </Group>
                            <Header aside={<Link href={shelter.link}>Группа VK</Link>}>
                                {shelter.name}
                            </Header>
                            <Header level={'secondary'}>
                                {shelter.city}
                            </Header>
                            <Div>
                                {shelter.description}
                            </Div>
                            <Div style={{display: 'flex'}}>
                                <Button
                                    stretched
                                    onClick={() => setActiveModal('modal')}
                                    style={{marginRight: 8}}>Помочь делом</Button>
                                <Button
                                    stretched
                                    component="a"
                                    href={shelter.payLink}>Помочь рублём</Button>
                            </Div>
                        </>
                    )}
                </Panel>
            </View>
        </Epic>

    );
};

export default App;

