import { Icon } from "phosphor-react";
import React from "react";

interface SocialProps {
  icon: Icon;
  link?: string;
}

const IconSocial = ({ icon: Icon }: SocialProps) => {
  return (
    <Icon size={30} color="white" />
  )
}

export const Social = (props: SocialProps) => {
  return (
    <a
      href={props.link}
      target="_blank"
      className="cursor-pointer hover:scale-110 transform transition duration-300" rel="noreferrer"
    >
      <IconSocial icon={props.icon}/>
    </a>
  );
};
