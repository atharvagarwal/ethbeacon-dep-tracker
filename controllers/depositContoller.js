const axios = require("axios");
const Deposit = require("../model/deposit"); // Adjust path as necessary
const {logger}=require('../config/logger')
// Helper function to get block timestamp
const getBlockTimestamp = async (blockNumber) => {
  const url = process.env.ETH_RPC_URL; // URL for Ethereum RPC

  try {
    const response = await axios.post(url, {
      jsonrpc: "2.0",
      id: 1,
      method: "eth_getBlockByNumber",
      params: [blockNumber, false], // false for not including full transactions
    });

    const block = response.data.result;
    return block ? parseInt(block.timestamp, 16) * 1000 : null; // Convert hex to milliseconds
  } catch (error) {
    logger.error("Error fetching block timestamp:", error.message)
    return null;
  }
};

// Helper function to send Telegram notification
const sendTelegramNotification = async (message) => {
  const botToken = process.env.TELEGRAM_NOTIFICATIONS_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_NOTIFICATIONS_CHAT_ID;
  const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

  try {
    await axios.post(telegramUrl, {
      chat_id: chatId,
      text: message,
    });
  } catch (error) {
    logger.error("Error sending Telegram notification:", error.message)
  }
};

// Controller function to handle deposit data
const handleDepositData = async (req, res) => {
  try {
    const { event } = req.body;

    // Check if event.activity exists
    if (!event || !event.activity) {
      return res.status(400).json({ message: "Invalid request data" });
    }

    const activities = event.activity;
    logger.info("Received activity data:")

    for (const activity of activities) {
      logger.info("Processing deposit data:")

      // Convert blockNum from hex to number
      const blockNumberHex = activity.blockNum;
      const blockNumber = `0x${parseInt(blockNumberHex, 16).toString(16)}`;

      // Get block timestamp
      const blockTimestamp = await getBlockTimestamp(blockNumber);

      const depositData = {
        blockNumber: parseInt(blockNumberHex, 16),
        blockTimestamp: blockTimestamp ? new Date(blockTimestamp) : null,
        fee: activity.value,
        hash: activity.hash,
        pubkey: activity.fromAddress,
        network: "sepolia",
      };

      // Check if the transaction with the same hash already exists in the DB
      const existingDeposit = await Deposit.findOne({ hash: depositData.hash });

      if (existingDeposit) {
        logger.info(
          `Deposit ${depositData.hash} already exists in the database, skipping.`
        );
        continue; // Skip if deposit with same hash exists
      }

      // Create a new deposit document
      const deposit = new Deposit(depositData);

      // Save deposit data to MongoDB
      await deposit.save();
      logger.info(`Deposit ${depositData.hash} saved to the database.`)

      // Send Telegram notification
      const message = `New deposit detected:\n\nHash: ${depositData.hash}\nBlock Number: ${depositData.blockNumber}\nFee: ${depositData.fee}\nTimestamp: ${depositData.blockTimestamp}`;
      await sendTelegramNotification(message);
    }

    // Respond with success
    res.status(201).json({ message: "Deposit data stored successfully" });
  } catch (error) {
    logger.error("Error handling POST request:", error.message)
    res.status(500).json({ message: "Internal server error" });
  }
};



module.exports = {
  handleDepositData,
};
