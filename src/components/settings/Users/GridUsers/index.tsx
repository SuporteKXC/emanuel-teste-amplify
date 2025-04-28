import React from "react"
import { useHistory } from "react-router-dom"
import * as S from "./styles"
import { User } from "interfaces/user"
import { useTranslation } from "hooks"

import { translations } from "./translations"
import { niceDate } from "utils"
import { RootStateOrAny, useSelector } from "react-redux"
import { LanguageState } from "store/ducks/language"

interface IGridUsersProps {
  users: User[] | Record<string, any>[]
  root?: boolean
}

interface IUserProps {
  user: User | Record<string, any>
  language: string
  root: boolean
}

const Item: React.FC<IUserProps> = ({ user, language, root }) => {
  const history = useHistory()

  return (
    <S.ItemContainer onClick={() => history.push(`/settings/user/${user.id}`)}>
      <S.ItemContent>
        <S.ItemValue>{user.id || "--"}</S.ItemValue>
        <S.ItemValue>
          {user.roles.length ? user.roles[0].name : "--"}
        </S.ItemValue>
        <S.ItemValue>{user.name || "--"}</S.ItemValue>
        <S.ItemValue>{user.email || "--"}</S.ItemValue>
        <S.ItemValue>
          {user.last_access
            ? niceDate({ dateString: user.last_access, language })
            : "--"}
        </S.ItemValue>
        {root ? (
          <S.ButtonDetail>
            <S.IconDetail />
          </S.ButtonDetail>
        ) : (
          <></>
        )}
      </S.ItemContent>
    </S.ItemContainer>
  )
}

export const GridUsers: React.FC<IGridUsersProps> = ({
  users = [],
  root = false,
}) => {
  const { getTranslation } = useTranslation(translations)
  const { language } = useSelector<RootStateOrAny, LanguageState>(
    (state) => state.language
  )
  return (
    <S.Container>
      <S.Header>
        <S.Label>{getTranslation("id")}</S.Label>
        <S.Label>{getTranslation("tipo")}</S.Label>
        <S.Label>{getTranslation("nome")}</S.Label>
        <S.Label>{getTranslation("email")}</S.Label>
        <S.Label>{getTranslation("ultimoAcesso")}</S.Label>
      </S.Header>
      {users.length > 0 &&
        users.map((user) => (
          <Item user={user} key={user.id} language={language} root={root} />
        ))}
    </S.Container>
  )
}
