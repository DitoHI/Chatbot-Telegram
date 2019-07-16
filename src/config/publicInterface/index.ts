interface IError {
  message: string;
  status: number;
}

interface IFullfillmentMessage {
  text?: string;
  content?: any;
  sticker?: boolean;
}

export { IError, IFullfillmentMessage };
