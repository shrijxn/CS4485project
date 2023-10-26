import unittest
import app


# testing email naming conventions
class MyTestCase(unittest.TestCase):
    def test_validEmail(self):
        email = "example@gmail.com"
        email2 = "@gmail.com"
        email3 = "examplegmail.com"
        email4 = "example@gmail"
        self.assertEqual('valid', app.validEmail(email))
        # self.assertEqual('Email is invalid', app.validEmail(email4))


if __name__ == '__main__':
    unittest.main()
