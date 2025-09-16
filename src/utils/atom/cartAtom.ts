import {atom, selector} from 'recoil'
import {recoilPersist} from 'recoil-persist'

const {persistAtom} = recoilPersist({
    key: 'recoil-persist',
    storage: sessionStorage

})

export const favoriteState = atom({
    key: 'favorite',
    default: [],
    effects_UNSTABLE: [persistAtom]
})


export const getFavorite = selector({
    key: 'favoriteState',
    get: ({ get }) => {
        // Define how to derive the state or perform computation
        const favoriteData = get(favoriteState);
       // Access other recoil atoms/selectors using `get`
        return favoriteData?.map((res: any)=> res?.price).reduce((a: any,b: any)=> a+b, 0)
      },
})
