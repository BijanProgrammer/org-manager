export type TextEntity =
  | {
      type: "plain";
      text: string;
    }
  | {
      type: "hashtag";
      text: string;
    }
  | {
      type: "link";
      text: string;
    }
  | {
      type: "text_link";
      text: string;
      href: string;
    };
