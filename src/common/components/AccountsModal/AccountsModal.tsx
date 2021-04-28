import React, { useState, useContext, useMemo, useEffect, useRef } from 'react';
import CheckIcon from 'remixicon-react/CheckLineIcon';
import clsx from 'clsx';

import { IStoreContext, StoreContext } from 'context/Store';
import { IAccount } from 'common/types/account';
import { searchList, highlightQuery } from 'common/utils';
import { Column } from 'common/styles/layout';
import Modal from 'common/components/Modal';
import SearchInput from 'common/components/SearchInput';
import RoundedFlag from 'common/components/RoundedFlag';
import Typography from 'common/components/Typography';
import { Wrapper, AccountsList, Account } from './styled';

interface IProps {
  isOpen: boolean;
  selectedAccount: IAccount;
  onSelectAccount: (account: IAccount) => void;
  onClose: () => void;
}

const AccountsModal = ({
  isOpen,
  selectedAccount,
  onSelectAccount,
  onClose,
}: IProps) => {
  const { accounts } = useContext<IStoreContext>(StoreContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [internalIsOpen, setInternalIsOpen] = useState(isOpen);
  const timeoutId = useRef(null);

  const filteredAccounts = useMemo<IAccount[]>(() => {
    if (!searchTerm) return accounts;

    return searchList(accounts, searchTerm, ['currency', 'currencyName']);
  }, [accounts, searchTerm]);

  useEffect(() => {
    if (!isOpen) setSearchTerm('');
    if (isOpen !== internalIsOpen) setInternalIsOpen(isOpen);

    return () => timeoutId.current && clearTimeout(timeoutId.current);
  }, [isOpen]);

  const closeModal = () => {
    setInternalIsOpen(false);
    timeoutId.current = setTimeout(onClose, 250);
  };

  return (
    <Modal isOpen={internalIsOpen} onClose={closeModal}>
      <Wrapper data-testid="currency-modal">
        <SearchInput
          value={searchTerm}
          onChange={(e: React.FormEvent<HTMLInputElement>) => {
            setSearchTerm((e.target as HTMLInputElement).value);
          }}
          autoFocus
          className="search-input"
        />
        <AccountsList role="list">
          {filteredAccounts.map(account => (
            <Account
              key={account.id}
              htmlFor={account.id}
              className={clsx({
                active: account.id === selectedAccount?.id,
              })}
              role="listitem"
            >
              <input
                type="checkbox"
                id={account.id}
                checked={account.id === selectedAccount?.id}
                name="currency"
                onChange={() => {
                  onSelectAccount(account);
                  closeModal();
                }}
                aria-label={account.currency}
              />
              <div className="content">
                <RoundedFlag country={account.countryCode} />
                <Column className="info">
                  <Typography
                    fontWeight="bold"
                    className={clsx({
                      'search-active': searchTerm !== '',
                    })}
                    dangerouslySetInnerHTML={{
                      __html: highlightQuery(account.currency, searchTerm),
                    }}
                  />
                  <Typography
                    variant="caption"
                    color="text"
                    shade="light"
                    className={clsx({
                      'search-active': searchTerm !== '',
                    })}
                    dangerouslySetInnerHTML={{
                      __html: highlightQuery(account.currencyName, searchTerm),
                    }}
                  />
                </Column>
                <CheckIcon className="check-icon" />
              </div>
            </Account>
          ))}
        </AccountsList>
      </Wrapper>
    </Modal>
  );
};

export default AccountsModal;
