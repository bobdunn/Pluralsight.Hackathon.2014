var aws = require('aws-sdk');
aws.config.loadFromPath('./aws.json');

var sqs = new aws.SQS();
var queueUrl = 'https://sqs.us-east-1.amazonaws.com/325947624253/slack_messages'

function read(callback) {
	sqs.receiveMessage({
		QueueUrl: queueUrl
	}, function(err, data) {
		if (err) {
			console.log(err);
		}
		else {
			if (! data.Messages) return;
			for (var i = 0; i < data.Messages.length; i++) {
				var message = data.Messages[i];
				sqs.deleteMessage({ReceiptHandle: message.ReceiptHandle, QueueUrl: queueUrl});

				var slackMessage = JSON.parse(message.Body);
				if (callback && slackMessage.channel_name == "hackathon-sphero") {
					callback(slackMessage);
				}
			}
		}
	})
}

exports.read = read;
