import React, { useState, useMemo, useContext, useEffect } from 'react';

import Panel from './panel';
import Table from './table';
import Graph from './chart';
import Bar from './bar';
import { UserContext, Permissions } from '../store/userContext';
import { DeveloperContext, DeveloperActions } from '../store/developerContext';

export default function Main() {
  const {user} = useContext(UserContext);
  const {developer, developerDispatch} = useContext(DeveloperContext);

  const [chartData, setChartData] = useState<any>(false);
  const [barData, setBarData] = useState<any>(false);
  const [characterData, setCharacterData] = useState<any>([]);
  const [bookData, setBookData] = useState<any>([]);
  const [movieData, setMovieData] = useState<any>([]);

  useEffect(() => {
    if( developer.reset) {
      developerDispatch({type: DeveloperActions.SET_RESET, payload: false});
      setChartData(false);
      setBarData(false);
      setCharacterData([]);
      setBookData([]);
      setMovieData([]);
      fetch(`${process.env.PUBLIC_URL}/graph-data.json`).then((response) =>
        response.json()
      ).then((graphData) =>
        setChartData(graphData.datasets)
      );
      fetch(`${process.env.PUBLIC_URL}/bar-data.json`).then((response) => 
        response.json()
      ).then((graphData) =>
        setBarData(graphData.datasets)
      );
      fetch('https://the-one-api.herokuapp.com/v1/character', {
        method: 'GET',
        headers: {
          'Authorization': 'bearer -_PTvHP0Nev18TjXbIlc',
        },
      }).then((response) => 
        response.json()
      ).then((characters) =>
        setCharacterData(characters.docs)
      );
      Promise.all([
        fetch('https://the-one-api.herokuapp.com/v1/book', {
          method: 'GET',
          headers: {
            'Authorization': 'bearer -_PTvHP0Nev18TjXbIlc',
          },
        }).then((response) => 
          response.json()
        ),
        fetch('https://the-one-api.herokuapp.com/v1/chapter', {
          method: 'GET',
          headers: {
            'Authorization': 'bearer -_PTvHP0Nev18TjXbIlc',
          },
        }).then((response) => 
          response.json()
        ),
      ]).then((values) => {
        const chapters = values[1].docs.reduce((tot: any, cur: any) => {
          tot[cur.book] = tot[cur.book] || 0;
          tot[cur.book]++;
          return tot;
        }, {});
        setBookData(values[0].docs.map((item: any) => ({...item, chapters: chapters[item._id]})));
      });
      fetch('https://the-one-api.herokuapp.com/v1/movie', {
        method: 'GET',
        headers: {
          'Authorization': 'bearer -_PTvHP0Nev18TjXbIlc',
        },
      }).then((response) => 
        response.json()
      ).then((movies) => 
        setMovieData(movies.docs)
      );
    }
  }, [user.name, developer.reset]);

  const bookColumns = useMemo(() => [
    [Permissions.Developer, Permissions.Admin].includes(user.permissions) ? {
      Header: 'ID',
      accessor: '_id',
    } : null, {
      Header: 'Book',
      accessor: 'name',
    }, {
      Header: 'Chapters',
      accessor: 'chapters'
    }
  ].filter((item) => item), [user.permissions]);
  const movieColumns = useMemo(() => [
    [Permissions.Developer, Permissions.Admin].includes(user.permissions) ? {
      Header: 'ID',
      accessor: '_id',
    } : null, {
      Header: 'Movie',
      accessor: 'name',
    }, {
      Header: 'Runtime',
      accessor: 'runtimeInMinutes'
    }, {
      Header: 'Awards',
      accessor: 'academyAwardWins',
    },
  ].filter((item) => item), [user.permissions]);
  const characterColumns = useMemo(() => [
    [Permissions.Developer, Permissions.Admin].includes(user.permissions) ? {
      Header: 'ID',
      accessor: '_id',
    } : null, {
      Header: 'Name',
      accessor: 'name',
    }, {
      Header: 'Race',
      accessor: 'race',
    }, {
      Header: 'Height',
      accessor: 'height',
    }, {
      Header: 'Gender',
      accessor: 'gender',
    }, {
      Header: 'Birth',
      accessor: 'birth',
    }, {
      Header: 'Spouse',
      accessor: 'spouse',
    }
  ].filter((item) => item), [user.permissions]);

  return (
    <main style={{gridTemplateRows: 'auto auto'}}
          className="bg-palette-gray rounded-t-lg p-4 h-100 flex-grow p-6 grid grid-rows-2 grid-cols-4 gap-6 shadow-inner"
    >
      <Panel colSpan={2} style={{maxHeight: '25rem'}}>
        <h2 className="text-palette-black mb-2">Frodo vs Bilbo Travel Distance by Day</h2>
        <Graph chartData={chartData}/>
      </Panel>
      <Panel colSpan={2} style={{maxHeight: '25rem'}}>
        <h2 className="text-palette-black mb-2">Distribution of Characters by Race/Gender</h2>
        <Bar chartData={barData}/>
      </Panel>
      <Panel colSpan={2}><Table tableData={characterData} tableColumns={characterColumns}/></Panel>
      <Panel colSpan={1}><Table tableData={bookData} tableColumns={bookColumns}/></Panel>
      <Panel colSpan={1}><Table tableData={movieData} tableColumns={movieColumns}/></Panel>
    </main>
  );
}
