import React from 'react'

import DatosGeneralesBrief from './datos_generales'
import Metodologia1 from './metodologia_1'
import Metodologia2 from './metodologia_2'
import Metodologia3 from './metodologia_3'
import Otros from './otros'
const tabsSpread = (props) => {
   return (
      [{
         tabs: [
            { name: 'DATOS GENERALES' },
            { name: 'METODOLOGIA 1' },
            { name: 'METODOLOGIA 2' },
            { name: 'METODOLOGIA 3' },
            { name: 'OTROS' },
            { name: 'MUESTRAS' }
         ],
         component: [
            { component: <DatosGeneralesBrief {...props} /> },
            { component: <Metodologia1 {...props} /> } ,
            { component:  <Metodologia2 {...props} /> },
            { component:  <Metodologia3 {...props} /> },
            { component:  <Otros {...props} /> },
            { component: 'hwebfhwebgh' },
         ]
      }]
   );
}
export default tabsSpread