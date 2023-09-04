import React, { useMemo } from 'react';
import { IntlProvider } from 'react-intl';
import { createTheme, ThemeProvider, ThemeOptions } from '@mui/material/styles';
import { Localization, enUS, zhTW } from '@mui/material/locale';
import en from 'src/assets/i18n/en';
import tw from 'src/assets/i18n/tw';
import { useAppSelector } from 'src/redux/store';
import { GlobalStyle } from './globalStyle';
import lightTheme from './light-theme.json';

interface IProps {
  children: JSX.Element
}

interface ILocales {
  [key: string]: ILocale,
}

interface ILocale {
  reactLocale: Record<string, string>
  muiLocale: Localization
}

export default ({ children }: IProps) => {
  const { locale } = useAppSelector((state) => state.themeReducer);
  const locales: ILocales = {
    en: { reactLocale: en, muiLocale: enUS },
    'zh-tw': { reactLocale: tw, muiLocale: zhTW },
  };
  const theme = useMemo(() => createTheme(lightTheme as ThemeOptions, locales[locale].muiLocale), [locale]);

  return (
    <IntlProvider
      locale={locale}
      key={locale}
      defaultLocale="en"
      messages={locales[locale].reactLocale}
    >
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        {children}
      </ThemeProvider>
    </IntlProvider>
  );
};
