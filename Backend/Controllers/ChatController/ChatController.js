const ChatModal = require("../../Modals/ChatModel/ChatModalSchema");

const MessageModal = require("../../Modals/ChatModel/MessageModal");

const EnggDetailModel = require("../../Modals/ServiceEngineerModals/ServiceEngineerDetailSchema");

//--------------------------------------------------------------------------------------------------------------------------------------------
//create chat for both sender and reciver

module.exports.CreateChat = async (req, res) => {
  try {
    const { userId, LoginId } = req.body;

    var isChat = await ChatModal.find({
      $and: [
        { Users: { $elemMatch: { $eq: LoginId } } },
        { Users: { $elemMatch: { $eq: userId } } },
      ],
    });

    if (isChat.length > 0) {
      //   return res.send(isChat[0])
      return res.status(200).json({ FullChat: isChat[0] });
    } else {
      var chatData = {
        ChatName: "sender",
        Users: [userId, LoginId],
      };
    }

    const createdChat = await ChatModal.create(chatData);

    const FullChat = await ChatModal.findOne({ _id: createdChat._id });

    return res.status(200).json({ FullChat });
  } catch (error) {
    console.log(error);
  }
};

//--------------------------------------------------------------------------------------------------------------------------------------------

//function to handle sendmessage

module.exports.sendMessage = async (req, res) => {
  try {
    const { Sender, Content, ChatId, serviceId } = req.body;

    if (!Sender || !Content || !ChatId) {
      return res
        .status(400)
        .json({ message: "Invalid data pass in the Request" });
    }

    var newMessage = {
      Sender,
      Content,
      ChatId,
      serviceId,
    };

    var message = await MessageModal.create(newMessage);

    message = await message.populate("ChatId");
    console.log("reached here succcccesssfulllly");
    return res.json(message);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//--------------------------------------------------------------------------------------------------------------------------------------------

//fetch data for particular chat

module.exports.fetchChatUsingChatId = async (req, res) => {
  try {
    const { ChatId, serviceId } = req.params;

    const chats = await MessageModal.find({ ChatId, serviceId });

    if (!chats) {
      return res.status(400).json({ message: "This is chat id is Invalid" });
    }

    return res.status(200).json({ messageModel:chats });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//--------------------------------------------------------------------------------------------------------------------------------------------

// fetch chat of particular Engineeer

module.exports.fetchChatForParticularEngineeer = async (req, res) => {
  try {
    const { ServiceEnggId } = req.params;

    const enggObjectId = await EnggDetailModel.findOne({
      EnggId: ServiceEnggId,
    }).select("_id");

    if (!enggObjectId) {
      return res
        .status(400)
        .json({ message: "This is ServiceEngg Id is Invalid" });
    }

    const chatModel = await ChatModal.findOne({ Users: enggObjectId }).select(
      "_id"
    );

    console.log("this is my chat model",chatModel._id);

    const messageModel = await MessageModal.find({ ChatId: chatModel._id });

    if (!messageModel) {
      return res
        .status(400)
        .json({ message: "No messages found for this ServiceEngg" });
    }

    res.status(200).json({ messageModel });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal Server Error while fecthing the Engg chat" });
  }
};
