import LogOut from '@geist-ui/react-icons/logOut';
import Menu from '@geist-ui/react-icons/menu';
import Monitor from '@geist-ui/react-icons/monitor';
import User from '@geist-ui/react-icons/user';
import Dismiss from '@geist-ui/react-icons/x';
import * as React from 'react';
import tw from 'twin.macro';

import { SignInButton } from '$/blocks/SignInButton';
import { Avatar } from '$/components/Avatar';
import { useCurrentUser } from '$/components/CurrentUserProvider/useCurrentUser';
import { Link } from '$/components/Link';
import { useLogout } from '$/hooks/useLogout';
import { bluredBg } from '$/styles/common';

import { IconButton } from '../Button';
import { Divider } from '../Divider';
import { DropDownMenu } from '../DropDownMenu';
import { Logo } from '../Logo';

export function Header(): JSX.Element {
  const { username, displayName, avatar, error, isLogin } = useCurrentUser();

  const [showMenu, setShowMenu] = React.useState(false);
  const handleClickMenu = React.useCallback(() => {
    setShowMenu((prev) => !prev);
  }, []);

  const handleClickLogOut = useLogout();

  if (error) {
    console.error('Get current user error:', error);
  }
  return (
    <header
      css={[
        tw`w-full py-3 transition duration-150 border-b sm:(sticky top-0 left-0 z-10) border-gray-300 dark:border-gray-700`,
        bluredBg,
      ]}
    >
      <div tw="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <section tw="flex flex-row items-center justify-between">
          <div tw="flex items-center sm:hidden pl-3">
            <IconButton size="sm" aria-expanded={false} onClick={handleClickMenu}>
              <span tw="sr-only">Open navigation menu</span>
              <Menu css={[showMenu && tw`hidden`]} />
              <Dismiss css={[!showMenu && tw`hidden`]} />
            </IconButton>
          </div>
          <div tw="flex flex-row sm:(items-stretch justify-start)">
            <div tw="flex flex-row items-center space-x-2">
              <Logo />
            </div>
            <nav tw="w-full hidden sm:(flex mb-0 pl-8 ml-8 border-l border-gray-200) flex-wrap items-center mb-5 space-x-5">
              {!isLogin ? (
                <Link href="/pricing" tw="" highlightMatch>
                  Pricing
                </Link>
              ) : (
                <Link href={`/dashboard/${username}`} tw="" highlightMatch>
                  Dashboard
                </Link>
              )}
              <Link href="/docs/index" tw="" highlightMatch>
                Docs
              </Link>
              <Link href="/blog" tw="" highlightMatch>
                Blog
              </Link>
            </nav>
          </div>
          <div tw="flex">
            {displayName ? (
              <DropDownMenu content={<Avatar src={avatar} alt={`The avatar of ${displayName}`} />}>
                <DropDownMenu.Item tw="">
                  <Link
                    variant="plain"
                    href={`/dashboard/${username}`}
                    tw="flex flex-row items-center justify-end space-x-1"
                  >
                    <Monitor size={14} />
                    <span>Dashboard</span>
                  </Link>
                </DropDownMenu.Item>
                <DropDownMenu.Item tw="">
                  <Link
                    variant="plain"
                    href="/profile"
                    tw="flex flex-row items-center justify-end space-x-1"
                  >
                    <User size={14} />
                    <span>Profile</span>
                  </Link>
                </DropDownMenu.Item>
                <Divider />
                <DropDownMenu.Item
                  tw="flex flex-row justify-start items-center space-x-1"
                  onClick={handleClickLogOut}
                >
                  <LogOut size={14} />
                  <span>Logout</span>
                </DropDownMenu.Item>
              </DropDownMenu>
            ) : (
              <SignInButton />
            )}
          </div>
        </section>
      </div>
      <div tw="w-full">
        <nav css={[tw`flex w-full flex-col px-2 pt-2 pb-3 space-y-1`, !showMenu && tw`hidden`]}>
          {isLogin ? (
            <Link href={`/dashboard/${username}`} tw="px-3 py-2" highlightMatch>
              Dashboard
            </Link>
          ) : (
            <Link href="/pricing" tw="px-3 py-2" highlightMatch>
              Pricing
            </Link>
          )}
          <Link href="/docs/index" tw="px-3 py-2" highlightMatch>
            Docs
          </Link>
          <Link href="/blog" tw="px-3 py-2" highlightMatch>
            Blog
          </Link>
        </nav>
      </div>
    </header>
  );
}
