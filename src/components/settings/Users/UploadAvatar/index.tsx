import React, { useCallback, useEffect, useState} from "react";
import { useDispatch } from "react-redux";
import { Camera } from "@styled-icons/boxicons-regular";
import avatar from "../../../../assets/images/avatar.png";
import { useTranslation } from "hooks";
import { translations } from "./translations";
import * as S from "./styles";

import {
  CreateUserAvatarActions,
  GetUserAvatarActions,
  UpdateUserAvatarActions
  } from "store/ducks/settings/users/index";
interface Props {
  userId: number;
}

export const UploadAvatar: React.FC<Props> = ({ userId }) => {
  const dispatch = useDispatch();
  const [avatarSrc, setAvatarSrc] = useState('');
  const [avatarValid, setAvatarValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const { getTranslation } = useTranslation(translations);

  const handleSubmit = useCallback(
    async (data) => {      
      try {
        if (!data.target.files[0]) return
        const formData = new FormData();
        formData.append("image", data.target.files[0]);
        formData.append("user_id", `${userId}`);
        dispatch(
          CreateUserAvatarActions.request(formData)
          );
          setAvatarSrc(URL.createObjectURL(data.target.files[0]))
        setAvatarValid(true)
      } catch (error) {
        console.log(error);
      }
    },
    [dispatch, userId]
  );

  const handleUpdate = useCallback(
    async (data) => {
      try {
        if (!data.target.files[0]) return
        const formData = new FormData();
        formData.append("image", data.target.files[0]);
        formData.append("user_id", `${userId}`);
        dispatch(
          UpdateUserAvatarActions.request(userId ,formData )
          );
          setAvatarSrc(URL.createObjectURL(data.target.files[0]))
      } catch (error) {
        console.log(error);
      }
    },
    [dispatch, userId]
  );

  const onFetchSuccess = useCallback(
    (data) => {  
      if (data.temp_image_url) {
        setAvatarSrc(data.temp_image_url)
        setAvatarValid(true)
        setLoading(false)
      } else {
        setAvatarSrc(avatar)
      }
    },
    [setAvatarSrc]
  );

  const onFetchFail = useCallback(
    (data) => {
        setAvatarSrc(avatar)
        setAvatarValid(false)
        setLoading(false)
    },
    [setAvatarSrc]
  );

  const getAvatarUser = useCallback(
    async () => {
      try {
        setLoading(true)
        dispatch(
          GetUserAvatarActions.request(userId, onFetchSuccess, onFetchFail)
        );
      } catch (error) {
        console.log(error);
      }
    },
    [dispatch, userId, onFetchSuccess, onFetchFail]
  );

  useEffect(() => {
    userId && getAvatarUser()
  }, [userId, getAvatarUser ]);

  return (
    <S.Container>
      <S.AvatarContainer>
        {loading ? <S.Loading /> : 
          <S.Avatar src={avatarSrc} />
        }
      </S.AvatarContainer>
      <S.IconContainer htmlFor="upload-avatar">
        <Camera height="24" />
          {getTranslation('editarF')}
        <S.FileInput
          accept="image/*"
          onChange={
            value => !avatarValid ? handleSubmit(value) : handleUpdate(value)
          } 
          id="upload-avatar" />
      </S.IconContainer>
   </S.Container>
  );
};
