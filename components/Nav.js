import Link from "next/link";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import Logo from "@/components/Logo";

export default function Nav({ show }) {
  const inactiveLink = 'flex gap-2 p-4 rounded hover:bg-blue-100 ';
  const activeLink = inactiveLink + '  text-black bg-blue-300';
  const inactiveIcon = 'w-6 h-6 ';
  const activeIcon = inactiveIcon + ' text-primary';
  const router = useRouter();
  const { pathname } = router;
  const logout = async()=> {
    await signOut({ callbackUrl: '/' });
  }
  return (
    <aside className={(show ? 'left-0' : '-left-full') + " top-0 text-black p-4 fixed w-full bg-white h-full md:static md:w-auto transition-all  "}>
      <div className="mb-4 mr-4  top-14 ">
        <Logo />
      </div>
      <nav className="flex flex-col gap-2 bg-white ">
        <Link href={'/'} className={` ${pathname === '/' ? activeLink : inactiveLink}`}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={pathname === '/' ? activeIcon : inactiveIcon}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          </svg>
          Dashboard
        </Link>
        <Link href={'/products'} className={`${pathname === '/products' ? activeLink : inactiveLink}`}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={pathname.includes('/products') ? activeIcon : inactiveIcon}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
          </svg>
          Products
        </Link>
        <Link href={'/categories'} className={`hover:bg-blue-100 ${pathname === '/categories' ? activeLink : inactiveLink}`}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={pathname.includes('/categories') ? activeIcon : inactiveIcon}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
          Categories
        </Link>
        <Link href={'/subcategories'} className={`hover:bg-blue-100 ${pathname === '/subcategories' ? activeLink : inactiveLink}`}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={pathname.includes('/subcategories') ? activeIcon : inactiveIcon}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
          Sub Categories
        </Link>
        <Link href={'/orders'} className={`hover:bg-blue-100 ${pathname === '/orders' ? activeLink : inactiveLink}`}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={pathname.includes('/orders') ? activeIcon : inactiveIcon}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
          </svg>
          Orders
        </Link>
        <Link href={'/banner'} className={`hover:bg-blue-100 ${pathname === '/banner' ? activeLink : inactiveLink}`}>
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABKElEQVR4nO3Yu03EQBSF4S9ZEZARUAMRBbAmWlIkElqgBWiDFuiBkICHI1JIgIyQgAIQMlppI2uxhD3jB3t/6UoOrDM6uvfMeEwQ9MYtHv0DqlVNniqMTLAjJe4Trtmkt8AbXnGB7b8aGWu942QjjTSxHIM76WjSW3QdrbFkpDXrjJS19tbf7Vrr9B5yGKkGMFLlmNf6AgUOExr5TS85Q+1QyQkjoiNitJqIjIiM6DUjBwm052M4R4oE2k1fCMmJsIuwi9Ha6F1rnkC7GIORKu4j4mLViRgtcSCKXauJ+p/GPqqUgRnO8NGDgU+cY0tGdnCJrwwGvnGFXT2yh+uEJm6wb0CO8NTBwAtOjYRZi/z0koOc+RkkB6nzM3gO2nKM51Utn4PABPkBxaG8XTeO478AAAAASUVORK5CYII=" width={25}/>
          Banner
        </Link>
        <Link href={'/blog'} className={`hover:bg-blue-100 ${pathname === '/blog' ? activeLink : inactiveLink}`}>
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABKElEQVR4nO3Yu03EQBSF4S9ZEZARUAMRBbAmWlIkElqgBWiDFuiBkICHI1JIgIyQgAIQMlppI2uxhD3jB3t/6UoOrDM6uvfMeEwQ9MYtHv0DqlVNniqMTLAjJe4Trtmkt8AbXnGB7b8aGWu942QjjTSxHIM76WjSW3QdrbFkpDXrjJS19tbf7Vrr9B5yGKkGMFLlmNf6AgUOExr5TS85Q+1QyQkjoiNitJqIjIiM6DUjBwm052M4R4oE2k1fCMmJsIuwi9Ha6F1rnkC7GIORKu4j4mLViRgtcSCKXauJ+p/GPqqUgRnO8NGDgU+cY0tGdnCJrwwGvnGFXT2yh+uEJm6wb0CO8NTBwAtOjYRZi/z0koOc+RkkB6nzM3gO2nKM51Utn4PABPkBxaG8XTeO478AAAAASUVORK5CYII=" width={25}/>
          Blogs
        </Link>
        <Link href={'/offer'} className={`hover:bg-blue-100 ${pathname === '/offer' ? activeLink : inactiveLink}`}>
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAACXBIWXMAAAsTAAALEwEAmpwYAAAC9UlEQVR4nO2bTWwNURTHf4qUshEbbYIu0JWFz4QFEhUUD2XTROxaQdKdj0RZ0rCwpCLCRrDohlh4iMTXa9IdsRISYSG+E436vHKTM3JzzbzXzrw3H/fNLznJmzt37pz/nJk55973HtQpzUAPcMhR6wFmeWKXA58A5bh9BJZpwQ+l4TrQ76jdEI0PtODvstGIuzSKxlGMkLuO8nTmgh1F5RF2HJVH2HFUHmHHUXmEHUflEQ5gG3ANKAHDKTXt21WgECXCE4BzKZjHjtfOhhW8S9q/yqrBCmBJSk37dhgYEZ+7wgi+Le17yQ77xedbYQQ/l/YFZIc28Vn7blNR8EtpbyU7tIrP2nebXPB4IzwdWC9LoJ51ytvdZiUwP2CMnWXW0xqAHdY5PGuPM8KLgFcBaWGN1XcO8EPGsy9GnxyzL0DwujLp5w/QEpfgp7JvCBgw7CTQZPXtNc6h18BN+qVdpz0/thsCBizr87mANRHcLO1vgclU5q5xjuMhBQ8yNmoiuAn4BXwDFldwYCbw0zjHsywK1py3nqf3wEURaLJb9t+RPkpy5XgFm6YLotgFTwVOAa8tZ+7Jm9Vj0KjWLsnngxEFF5MQbDMbeCP9FxoXxattdaRPyOdHWbyl/ShJ/9WyvTUgnfyWF19mBDcAx6wU4U003kkxobkgbU/kNiwauXuPJbhkjVcYQ1o6aj0+NRPcIknf7/vXDUa/IenX5jPlPG0VHrY9lv3tFQoP707xmCv7XlRTsOeIWeYVfN7Q84zb20NHZAswQ7anyfNtjtUtxyKFRWdAabmW/5kEXAYOxPEMpx2VC3ZgASBShIsVZjLOCe6S9hFZIEvzIp6erk6MKlhzpkxaSJsdoQqCkTRyRXLjcEpNl6urqJJgV1C5YMdReYRDsDmBX8ZuihrhUVmfCsOXBNLP56iCO4CNIQfpSOCXsWF9VXWSjf6RC3Ydld/SjqPqKcJTzL8AJFlExGU3RfD9pIuIOO0DsDTpIiIu6zb/qFVX/AWpN4OGkTrYTAAAAABJRU5ErkJggg==" width={25}/>
          Offer
        </Link>
        <Link href={'/Cuppon'} className={`hover:bg-blue-100 ${pathname === '/Cuppon' ? activeLink : inactiveLink}`}>
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAACXBIWXMAAAsTAAALEwEAmpwYAAAC9UlEQVR4nO2bTWwNURTHf4qUshEbbYIu0JWFz4QFEhUUD2XTROxaQdKdj0RZ0rCwpCLCRrDohlh4iMTXa9IdsRISYSG+E436vHKTM3JzzbzXzrw3H/fNLznJmzt37pz/nJk55973HtQpzUAPcMhR6wFmeWKXA58A5bh9BJZpwQ+l4TrQ76jdEI0PtODvstGIuzSKxlGMkLuO8nTmgh1F5RF2HJVH2HFUHmHHUXmEHUflEQ5gG3ANKAHDKTXt21WgECXCE4BzKZjHjtfOhhW8S9q/yqrBCmBJSk37dhgYEZ+7wgi+Le17yQ77xedbYQQ/l/YFZIc28Vn7blNR8EtpbyU7tIrP2nebXPB4IzwdWC9LoJ51ytvdZiUwP2CMnWXW0xqAHdY5PGuPM8KLgFcBaWGN1XcO8EPGsy9GnxyzL0DwujLp5w/QEpfgp7JvCBgw7CTQZPXtNc6h18BN+qVdpz0/thsCBizr87mANRHcLO1vgclU5q5xjuMhBQ8yNmoiuAn4BXwDFldwYCbw0zjHsywK1py3nqf3wEURaLJb9t+RPkpy5XgFm6YLotgFTwVOAa8tZ+7Jm9Vj0KjWLsnngxEFF5MQbDMbeCP9FxoXxattdaRPyOdHWbyl/ShJ/9WyvTUgnfyWF19mBDcAx6wU4U003kkxobkgbU/kNiwauXuPJbhkjVcYQ1o6aj0+NRPcIknf7/vXDUa/IenX5jPlPG0VHrY9lv3tFQoP707xmCv7XlRTsOeIWeYVfN7Q84zb20NHZAswQ7anyfNtjtUtxyKFRWdAabmW/5kEXAYOxPEMpx2VC3ZgASBShIsVZjLOCe6S9hFZIEvzIp6erk6MKlhzpkxaSJsdoQqCkTRyRXLjcEpNl6urqJJgV1C5YMdReYRDsDmBX8ZuihrhUVmfCsOXBNLP56iCO4CNIQfpSOCXsWF9VXWSjf6RC3Ydld/SjqPqKcJTzL8AJFlExGU3RfD9pIuIOO0DsDTpIiIu6zb/qFVX/AWpN4OGkTrYTAAAAABJRU5ErkJggg==" width={25}/>
          Cuppon
        </Link>
        <Link href={'/videos'} className={`hover:bg-blue-100 ${pathname === '/videos' ? activeLink : inactiveLink}`}>
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAACXBIWXMAAAsTAAALEwEAmpwYAAAC9UlEQVR4nO2bTWwNURTHf4qUshEbbYIu0JWFz4QFEhUUD2XTROxaQdKdj0RZ0rCwpCLCRrDohlh4iMTXa9IdsRISYSG+E436vHKTM3JzzbzXzrw3H/fNLznJmzt37pz/nJk55973HtQpzUAPcMhR6wFmeWKXA58A5bh9BJZpwQ+l4TrQ76jdEI0PtODvstGIuzSKxlGMkLuO8nTmgh1F5RF2HJVH2HFUHmHHUXmEHUflEQ5gG3ANKAHDKTXt21WgECXCE4BzKZjHjtfOhhW8S9q/yqrBCmBJSk37dhgYEZ+7wgi+Le17yQ77xedbYQQ/l/YFZIc28Vn7blNR8EtpbyU7tIrP2nebXPB4IzwdWC9LoJ51ytvdZiUwP2CMnWXW0xqAHdY5PGuPM8KLgFcBaWGN1XcO8EPGsy9GnxyzL0DwujLp5w/QEpfgp7JvCBgw7CTQZPXtNc6h18BN+qVdpz0/thsCBizr87mANRHcLO1vgclU5q5xjuMhBQ8yNmoiuAn4BXwDFldwYCbw0zjHsywK1py3nqf3wEURaLJb9t+RPkpy5XgFm6YLotgFTwVOAa8tZ+7Jm9Vj0KjWLsnngxEFF5MQbDMbeCP9FxoXxattdaRPyOdHWbyl/ShJ/9WyvTUgnfyWF19mBDcAx6wU4U003kkxobkgbU/kNiwauXuPJbhkjVcYQ1o6aj0+NRPcIknf7/vXDUa/IenX5jPlPG0VHrY9lv3tFQoP707xmCv7XlRTsOeIWeYVfN7Q84zb20NHZAswQ7anyfNtjtUtxyKFRWdAabmW/5kEXAYOxPEMpx2VC3ZgASBShIsVZjLOCe6S9hFZIEvzIp6erk6MKlhzpkxaSJsdoQqCkTRyRXLjcEpNl6urqJJgV1C5YMdReYRDsDmBX8ZuihrhUVmfCsOXBNLP56iCO4CNIQfpSOCXsWF9VXWSjf6RC3Ydld/SjqPqKcJTzL8AJFlExGU3RfD9pIuIOO0DsDTpIiIu6zb/qFVX/AWpN4OGkTrYTAAAAABJRU5ErkJggg==" width={25}/>
          Video
        </Link>
        <Link href={'/users'} className={`hover:bg-blue-100 ${pathname === '/users' ? activeLink : inactiveLink}`}>
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAC6UlEQVR4nO2ZXWiOYRjHf+ZzxLAkiQOfs1lTlEU5UEI7c4BoDsbJEFpKdkTKjnzswFdKDtd8TU4wiinNwcpnYhxoSGJMiLG9uvR/67byvs/7PrP7Vu+v7qP3vv7P/36f5/64rhty5PjvmAGsB/YC9cBBoBZYCgwhcAYDVcBDIJGiPQOWECiTgNuO2VdAI3AIqFGzN/NEv38FjgCLCIixjsGnQAUw6C9984ADfd5QAzCSADgtQ21AQYT+NphiYAfwVrHn8cxU4CfwAyjLIn4a0KnBrMAjm2XiXAyNPc4n5o0LMrExhsYcaTzHI60yUR5z2f4G9Pqc9O0aSFFMnS7p2ArohccyMDumzhfpjMETN2Ugzk49Xhqf8UiDTKyNobFQGvfxSK1M1MXQ2CmNY3hkuUxcj6FxSRrr8MhKmfiU5fF8GPBRGhV45IZM7EpxUEyFxeyWxjU8klx+szlnJSmTxiM8ckYmLKHKlk3SaMQjG2TihZKnTKlRrGlU4hE7J53VOalLuUZU8pyjiZ2eTcs7d2WoJIOYUsXYPAuGepnan0FMnWKOExDzZcqyvQkRz1fvFbOYwGiSMdtbClP0Gw1cUd9mAmQy8CZColWkPrajTydQ2iIMpNgp1AXLgwgDSeboHQRMu0zOTVNCSqimFSQTleWZySkp+hVoA/2uQQVFKXBPg7gcoX+jsxkuIABKlNl1O7VfK2ino9Cp2lul8hQwjwHGEqhVygp7ZaZHNeBMyjm2n5xUbLKgfQtYDQz9h/4ZAWx1TqsJlXFOpJnc6bBV7Kgzv6y9BLYD+f3o/3cWV6U7j+SD7LPYBozrx+cUAFucuWbttfKVbLLPPxgFXHSEWweoar6sz8VRk7xkxXCgRULvgDUMPJXOJ9eiYkXGHHZ24Fn4Xdo75MVuuzJipi5velQJ9E25vHTrxjgy+/QPXCUcmuXJrrwjc0dB1YRDtbPgROZDmrtyn60z6iDyAzCbSNNsc86RIwfR+AUnligdzeBw0AAAAABJRU5ErkJggg==" width={25}/>
          Users
        </Link>
        <Link href={'/enquiries'} className={`hover:bg-blue-100 ${pathname === '/enquiries' ? activeLink : inactiveLink}`}>
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAj0lEQVR4nO3VQQ6AIAwEwH2ynvVF+jGN+ob14qlRECkUCZtwaaCZlASAlpaCQ+X1PwBiDyucR3EAPozVV68HEJr6ALS+AloDQlMfgNZXQGtA9rA0AD1frPo3zdIAmvuzAUYAG4AhBsCXY7xrely13QowX7XpCyA0smkvoJ1jr0pk01UAltwAV5ICqPUOJAec5jQOyijHE58AAAAASUVORK5CYII=" alt="settings--v1" width={25}/>
        Enquiries
        </Link>

        <Link href={'/setting'} className={`hover:bg-blue-100 ${pathname === '/setting' ? activeLink : inactiveLink}`}>
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAE00lEQVR4nO2aWWhdVRSGP6xJixm01qoYW4fYwRSxILGtig8VfFD0QWlFELHUJ/tisaDUAaR1qm2ijU8OLxWHN4cHp6JWwfqirVAFFa1DakUQ1CQ114yy4D+wPDl373PPPTdytT9ccnPX2sPaZ++1/rX2geP4f+AxYBKYTn3GgS00EQYzjEg+B2gSdAJTwCgwx/3eod8rwIk0AVZr5Q9myL6XbDn/Is4BNgMLI3obNNkXM2SvS7Yu0sdC4E5gESVjCXBEk/gFuDag+7j07suQPSzZg4H2a4GfpPcj0E1JuMAZ8bv+2l7vA+amdFuA96RzQ0ZfN0v2Zur8GFqBHc7b/VGmMd6IfTqw9wBj+u0zoAc4H3gK+NV5J2ubxnIn/1lP7yxgKfCJc9Fb5TQ+LMOYs1NGtDlZL/C1ZKMa3L5PAO8Dtwb6vR34WE91Wl5sRN+/AVY53faUMV1FDEkO7Z/AqRlyG+Q56QwDjwJn1Og8BmSI9bFHTyGNBZqD6dxWxBB7Al+pg50BvYs1WFF0pZ5CGrs0hy9Tu6ImXKLzMClvMtu4UmOPR4zNhQe0IkeqbLFG4RTgh4ArrxlGJ/arwxeYPbykMT/KcNV1BcTkwK2k8bjCOZHSAiLy8xMKUvNz6K8A+oHP5VpH9L1fshgW62za4p1OiXhGK7QtotcqlzoRoPEm2y3dEJ6W/vayjJinJ2ErdFrEiL0uSD4BXCqX2Sav86SLG3sjxiyVnh34E4pM/GRgjSLwLhdZ3460G3AR+KJI3EkSL3syIRyQ3jviYRu0OFmB8x/pabXMbipCvVdoy4xGjPDGVNTGuFo13BHYorZgj2Q1SljnMRG4PSKI1+vwhdCvtvY3L3arjbHomMe8EbhXOc5BLdi05jwDiaVF9uMXamtkMi9Wqc2hAuPNcfOdgaqCHBhWWyOSedGuNkMFx5xuhCFDBQzpdAlUQwzpqGNrmUeptUhRZGt1hAwZdx7qW+AVBcB1OWhCctgtTuRF4q7NxYewDLgJeAh4DTjskjKb8wxskd+u1OF+K3KtMRhf+yuH+91UxfVWNNe7Ymy3x63Cu2r8Vk53OhgxZqVLoS365wmIb2h3rAcuLFrgm6fqyVgkE2xxFKUiw1bLAbSLLQzoSSQUxdo0jKLUQ+BaZUCINI7rSbTkHHMbJWKJJjdUA43vk0ca1ueQDnboTCRY1Cga3+NoQR4uVS8u01gj2mKlYK74jXX8LLOH5zXmpzlyl1zod8WzIsGyKNpdEdAofF24WjGklHJMAfTqrNgcrinaiZX2j2pF7o4MFsoc8xTo7ExUw1bN4WiOK41MbFYHv1XJyOa7ks2IErMza+j/XBW+EybxchWP2OluAezOpGYsdhnjB6ly5VplaEki5ovYVvC+JdDvxowidpIGDAJXOd02jZ1khIUvfrqdMfsU2Xe6bHK/dM5TIEyuFaZUpM6KR/5aYYeuFbpdEXBS8WaBxqz7WiHLmKRIN6YyZroC2OIGvy6jr/WumJBua//f7+5ekrEGyyzS2ep+p46N4l8e0O0LOIjtOWhHryrviRFZF0Z1oUv3EydF9Da6+440XpXMmHUIbSr9FLrYKQtrNFmrxKRxWDKj4k3zwsCxFP1uuhcGcIlTU7/Cge4Tq71UE0xPj4P/CP4GdM3Fkxh1C08AAAAASUVORK5CYII=" alt="settings--v1" width={25}/>
          Setting
        </Link>
        <button onClick={() => logout('logout')} className={`hover:bg-blue-100 ${inactiveLink}`}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
          </svg>
          Logout
        </button>
      </nav>
    </aside>
  );
}