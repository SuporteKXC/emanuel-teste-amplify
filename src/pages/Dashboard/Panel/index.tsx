import React from 'react';
import { Scaffold } from 'layouts';
import { ListingPageHeader } from 'components/Shared';
import * as S from './styles';
import { AuthData } from 'contracts/Auth';

interface DashboardProps {
  profile?: AuthData['profile'];
}

const urls = {
  root: `https://analytics.zoho.com/open-view/1432280000097356059/c365e708a9f5977c749eda19c118c5e5?ZOHO_CRITERIA=SUBSTRING("companies"."document", 1, 8)=`,
  noRoot: `https://analytics.zoho.com/open-view/1432280000097356059/c365e708a9f5977c749eda19c118c5e5?ZOHO_CRITERIA="companies"."id"=`,
  any: `https://analytics.zoho.com/open-view/1432280000097356059/c365e708a9f5977c749eda19c118c5e5`,
};

export const DashboardPanel = React.memo(({ profile }: DashboardProps) => {
  const url = React.useMemo(
    () =>
      profile?.company?.document && profile.root
        ? urls['root'] + profile?.company?.document?.substring(0, 8)
        : profile?.company?.id && !profile.root
        ? urls['noRoot'] + profile.company.id
        : urls['any'],
    [profile]
  );

  return (
    <Scaffold>
      <S.MainPanel>
        <ListingPageHeader
          icon={<S.DashboardIcon />}
          title="Dashboard"
          isLoading={false}
        />
        <S.Container>
          <S.Iframe src={url} />
        </S.Container>
      </S.MainPanel>
    </Scaffold>
  );
});
