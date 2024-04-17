


function getForgetPassword(template) {
    return '<div style="margin: 5px;">'
        + '<div style="width: 100%;*zoom: 1;">'
        + '<div style="padding: 5px;">'
        + '<p style="text-align:justify;">Dear ' + template.username + ',</p>'
        + '<p style="text-align:justify;">'
        + 'You have requested for password reset.<br />'
        + 'Please visit the following link in order to reset your password.<br />'
        + '<a href="' + template.link + '">' + template.link + '</a>'
        + '</p>'
        + '<p style="text-align:justify;">'
        + 'Thank you.<br />'
        + 'Flight Service App'
        + '</p>'
        + '</div>'
        + '</div>'
        + '</div>';

}

function getChangePassword(template) {
    return '<div style="margin: 5px;">'
        + '<div style="width: 100%;*zoom: 1;">'
        + '<div style="padding: 5px;">'
        + '<p style="text-align:justify;">Dear ' + template.username + ',</p>'
        + '<p style="text-align:justify;">'
        + 'You have recently changed your password.'
        + '</p>'
        + '<p style="text-align:justify;">'
        + 'Thank you.<br />'
        + 'Flight Service App'
        + '</p>'
        + '</div>'
        + '</div>'
        + '</div>';

}

function getUpdateProfile(template) {
    return '<div style="margin: 5px;">'
        + '<div style="width: 100%;*zoom: 1;">'
        + '<div style="padding: 5px;">'
        + '<p style="text-align:justify;">Dear ' + template.username + ',</p>'
        + '<p style="text-align:justify;">'
        + 'You have recently updated your profile.<br />'
        + '</p>'
        + '<p style="text-align:justify;">'
        + 'Thank you.<br />'
        + 'Flight Service App'
        + '</p>'
        + '</div>'
        + '</div>'
        + '</div>';

}

const sendMail = async (temp) => {
    let body = "";
    let subject = "";
    if (temp.type == "forgot-password") {
        body = getForgetPassword(temp);
        subject = "Did you forgot your password? - Flight Service";
    } else if (temp.type == "update-profile") {
        body = getUpdateProfile(temp);
        subject = "You have update your profile - Flight Service";
    } else if (temp.type === "new-password") {
        body = getChangePassword(temp);
        subject = "You have update your password";
    }
    return await window.Email.send({
        // SecureToken: "f3565e20-c5cd-48fb-b0e2-1ad6049dd3d3",
        SecureToken: "e99b14d8-f543-4a13-a63d-094ab31179c0",
        To: temp.mail,
        // From: "fdef84dd96-292157@inbox.mailtrap.io",
        From: "technepal81@gmail.com",
        Subject: subject,
        Body: body
    });
}
export const mailService = {
    sendMail
};

